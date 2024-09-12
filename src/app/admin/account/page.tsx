import Link from 'next/link';

export default function page() {
  return (
    <div>
      <h1>Account</h1>
      <h3 className="text-error">
        <Link href="/">Logout</Link>
      </h3>
    </div>
  );
}
