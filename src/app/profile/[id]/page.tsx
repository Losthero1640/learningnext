interface UserProfileProps {
  params: Promise<{ id: string }>;
}

export default async function UserProfile({ params }: UserProfileProps) {
  const { id } = await params; // <-- yaha await zaroori hai

  return (
    <div>
      <hr />
      <p className="text-4xl">User Profile Page {id}</p>
      <span className="p-2 rounded bg-orange-500">{id}</span>
    </div>
  );
}
