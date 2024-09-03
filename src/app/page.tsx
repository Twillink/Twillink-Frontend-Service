import Link from 'next/link';

export default function Home() {
  return (
    <div>
      <article className="prose">
        <div className="h-screen w-screen flex flex-col items-center justify-center px-2">
          <h2 className="text-center">twillink</h2>
          <h1 className="text-center">
            Your exceptional Link in Bio
            <br />
            <span className="text-lg text-slate-700">
              Claim your username now
            </span>
          </h1>
          <div className="card-actions justify-end">
            <Link href="/signup" passHref legacyBehavior>
              <button className="btn btn-primary">Get Started!</button>
            </Link>
          </div>
        </div>
      </article>
    </div>
  );
}
