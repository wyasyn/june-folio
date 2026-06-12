export default async function SingleBlogPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  return <div>Blog: {slug}</div>
}
