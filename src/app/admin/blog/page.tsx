import { getBlogs } from "./actions";
import BlogAdmin from "./BlogAdmin";

export const dynamic = "force-dynamic";

export default async function AdminBlogPage() {
  const blogs = await getBlogs();
  return <BlogAdmin initial={blogs} />;
}
