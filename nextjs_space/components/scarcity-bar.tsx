interface ScarcityBarProps {
  spotsRemaining: number;
}

export default function ScarcityBar({ spotsRemaining }: ScarcityBarProps) {
  return (
    <section className="bg-[#002147] py-5">
      <div className="max-w-[1200px] mx-auto px-6 text-center">
        <p className="font-heading font-semibold text-sm md:text-base text-white">
          <span className="mr-2">🔬</span>
          Pilot program is limited to 100 researchers.{' '}
          <span style={{ color: 'rgb(212,175,55)' }}>
            {spotsRemaining > 0
              ? `${spotsRemaining} spot${spotsRemaining === 1 ? '' : 's'} remaining.`
              : 'All spots have been filled — join the waitlist below.'}
          </span>
        </p>
      </div>
    </section>
  );
}
