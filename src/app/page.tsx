import GradientBg from '@/components/GradientBg';

export default function Home() {
  return (
    <div className="h-screen flex items-center justify-center">
      <GradientBg />
      <div>
        <div className="card bg-base-100 w-96">
          <div className="card-body">
            <p className="text-lg">Claim your link</p>
            <div className="card-actions justify-end">
              <button className="btn btn-primary">Learn now!</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
