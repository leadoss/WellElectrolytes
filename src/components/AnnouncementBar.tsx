"use client";

export default function AnnouncementBar() {
  const text =
    "FREE DELIVERY ON ORDERS $40+ ✦ FREE BOTTLE ON ALL ORDERS ✦ FREE DELIVERY ON ORDERS $40+ ✦ FREE BOTTLE ON ALL ORDERS ✦ FREE DELIVERY ON ORDERS $40+ ✦ FREE BOTTLE ON ALL ORDERS ✦ FREE DELIVERY ON ORDERS $40+ ✦ FREE BOTTLE ON ALL ORDERS ✦ ";

  return (
    <div className="bg-[#4A3222] text-white text-xs font-medium tracking-widest uppercase overflow-hidden py-2.5">
      <div className="flex whitespace-nowrap">
        <span className="animate-marquee inline-block pr-0">{text}</span>
        <span className="animate-marquee inline-block pr-0" aria-hidden>{text}</span>
      </div>
    </div>
  );
}
