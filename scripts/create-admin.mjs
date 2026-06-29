// Manually create an admin user (accounts can't be created from the app).
//
// Usage:
//   node scripts/create-admin.mjs "Full Name" email@example.com password
//
// It hashes the password the same way the app does (Node scrypt) and inserts
// the row into Supabase. It also prints an equivalent SQL INSERT you can run
// in the Supabase SQL editor instead.

import { createClient } from "@supabase/supabase-js";
import { scryptSync, randomBytes } from "crypto";
import { readFileSync } from "fs";

function loadEnv() {
  const env = { ...process.env };
  try {
    for (const line of readFileSync(".env.local", "utf8").split(/\r?\n/)) {
      const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
      if (m && env[m[1]] === undefined) env[m[1]] = m[2].replace(/^["']|["']$/g, "");
    }
  } catch {
    /* no .env.local — rely on process.env */
  }
  return env;
}

// Must match hashPassword() in src/app/admin/users/actions.ts
function hashPassword(password) {
  const salt = randomBytes(16).toString("hex");
  const derived = scryptSync(password, salt, 64).toString("hex");
  return `${salt}:${derived}`;
}

const [name, emailRaw, password] = process.argv.slice(2);

if (!name || !emailRaw || !password) {
  console.error('Usage: node scripts/create-admin.mjs "Full Name" email@example.com password');
  process.exit(1);
}
if (password.length < 6) {
  console.error("Password must be at least 6 characters.");
  process.exit(1);
}

const email = emailRaw.trim().toLowerCase();
const password_hash = hashPassword(password);

console.log("\n-- Or run this in the Supabase SQL editor:");
console.log(
  `insert into public.admin_users (name, email, password_hash)\n` +
  `  values ('${name.replace(/'/g, "''")}', '${email}', '${password_hash}');\n`
);

const env = loadEnv();
const url = env.NEXT_PUBLIC_SUPABASE_URL;
const key = env.SUPABASE_SERVICE_ROLE_KEY || env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!url || !key) {
  console.error("Supabase env not found — run the SQL above in Supabase instead.");
  process.exit(0);
}

const supabase = createClient(url, key);
const { error } = await supabase
  .from("admin_users")
  .insert({ name, email, password_hash, role: "admin" });

if (error) {
  if (error.code === "23505") console.error(`An admin with email "${email}" already exists.`);
  else console.error("Insert failed:", error.message);
  process.exit(1);
}

console.log(`✓ Admin created: ${name} <${email}>`);
