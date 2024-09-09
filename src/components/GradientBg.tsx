import Image from 'next/image';

export default function GradientBg() {
  return (
    <div className="absolute inset-0 -z-0 ">
      <Image
        src="/images/gradient-bg.png"
        layout="fill"
        objectFit="cover"
        quality={100}
        alt="gradient-bg"
      />
    </div>
  );
}
