interface IProps {
  className?: string;
}
export default function ComingSoon({className}: IProps) {
  return (
    <span
      className={`font-normal text-tiny bg-contras-med px-2 rounded-full text-general-med ${className}`}>
      Coming Soon
    </span>
  );
}
