import { listBlogsForAdmin } from '../../../lib/db/repos';
import BlogsAdminTable from './BlogsAdminTable';

export const runtime = 'nodejs';
export const revalidate = 0;

export default async function BlogsAdminPage({
  searchParams,
}: {
  searchParams: { sort?: string; dir?: string };
}) {
  const sort = (searchParams.sort as 'created_at' | 'title' | 'tag') || 'created_at';
  const dir = (searchParams.dir as 'asc' | 'desc') || 'desc';
  const blogs = await listBlogsForAdmin(sort, dir);
  return <BlogsAdminTable blogs={blogs} sortField={sort} sortDir={dir} />;
}
