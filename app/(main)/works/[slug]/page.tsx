export default async function SingleWorkPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  return <div>Work: {slug}</div>
}
