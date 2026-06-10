"use client";

import { useEffect, useMemo, useState, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion"; // ضفنا AnimatePresence هنا
import {
  CalendarDays,
  Clock3,
  Heart,
  MapPin,
  Navigation,
  Volume2,
  VolumeX,
} from "lucide-react";

const eventDate = new Date(2026, 5, 19, 15, 0, 0);

// لينكات الخريطة (حط لينكاتك هنا زي ما اتفقنا)
const mapsLink = "https://maps.app.goo.gl/fvUnTcCHiTLcnT546";
const mapEmbedLink = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d721.9865245854326!2d31.481689584323146!3d30.59543688268837!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14f7f1004ec60bd1%3A0x64d3f9ac40025478!2z2KjZiNmE2YrZgdin2LHYryAtIEJPVUxFVkFSRA!5e0!3m2!1sar!2sus!4v1781083991105!5m2!1sar!2sus"; 

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0 },
};

function getTimeLeft(target) {
  const diff = Math.max(0, target.getTime() - Date.now());
  const totalSeconds = Math.floor(diff / 1000);
  return {
    days: Math.floor(totalSeconds / 86400),
    hours: Math.floor((totalSeconds % 86400) / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60,
  };
}

function pad(n) {
  return String(n).padStart(2, "0");
}

function Divider() {
  return (
    <div className="flex items-center justify-center gap-3 text-[#c79f9f]">
      <div className="h-px w-11 bg-gradient-to-l from-transparent via-current to-transparent" />
      <div className="h-1.5 w-1.5 rounded-full bg-current" />
      <div className="h-px w-11 bg-gradient-to-r from-transparent via-current to-transparent" />
    </div>
  );
}

function SectionTitle({ title, subtitle }) {
  return (
    <div className="text-center">
      <Divider />
      <h2 className="mt-3 font-arabic text-[24px] text-[#6f4c4c]">{title}</h2>
      {subtitle && (
        <p className="mx-auto mt-2 max-w-[310px] text-[13px] leading-6 text-[#8b7373]">
          {subtitle}
        </p>
      )}
    </div>
  );
}

function Countdown() {
  const [timeLeft, setTimeLeft] = useState(() => getTimeLeft(eventDate));
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const timer = setInterval(() => {
      setTimeLeft(getTimeLeft(eventDate));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const items = useMemo(
    () => [
      { label: "ثانية", value: timeLeft.seconds },
      { label: "دقيقة", value: timeLeft.minutes },
      { label: "ساعة", value: timeLeft.hours },
      { label: "يوم", value: timeLeft.days },
    ],
    [timeLeft]
  );

  if (!isMounted) return <div className="h-[76px]"></div>;

  return (
    <div className="grid grid-cols-4 gap-2">
      {items.map((item) => (
        <div
          key={item.label}
          className="rounded-[18px] border border-white/80 bg-white/72 px-2 py-3 text-center shadow-[0_12px_32px_rgba(138,101,101,0.08)] backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#fffafa] hover:shadow-[0_16px_34px_rgba(138,101,101,0.12)]"
        >
          <div className="text-[18px] font-bold text-[#6f4c4c]">{pad(item.value)}</div>
          <div className="mt-1 text-[10px] font-semibold tracking-[0.14em] text-[#9f7a7a]">
            {item.label}
          </div>
        </div>
      ))}
    </div>
  );
}

export default function Page() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isInvOpen, setIsInvOpen] = useState(false); // حالة شاشة الترحيب
  const audioRef = useRef(null);

  // الدالة اللي بتفتح الدعوة وتشغل الصوت مع بعض
  const handleOpenInvitation = () => {
    setIsInvOpen(true);
    if (audioRef.current) {
      audioRef.current.play().catch(e => console.log("Audio error:", e));
      setIsPlaying(true);
    }
  };

  const toggleAudio = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div dir="rtl" className="min-h-screen bg-[#f7efec] text-[#5f4a4a] relative">
      <style>{`
        .font-ui { font-family: "CairoLocal", sans-serif; }
        .font-arabic { font-family: "AmiriLocal", serif; }
        .font-hero { font-family: "ArefRuqaaLocal", serif; }
        .paper-glow {
          background:
            radial-gradient(circle at 20% 14%, rgba(255,255,255,.95) 0 14%, transparent 42%),
            radial-gradient(circle at 84% 18%, rgba(245,214,216,.62) 0 12%, transparent 38%),
            radial-gradient(circle at 48% 82%, rgba(239,213,213,.45) 0 12%, transparent 44%),
            linear-gradient(180deg, #fffdfd 0%, #fff8f7 28%, #f6ece9 100%);
        }
        .grain:before {
          content: '';
          position: absolute;
          inset: 0;
          pointer-events: none;
          opacity: .05;
          background-image:
            radial-gradient(rgba(125, 86, 86, 0.16) 0.4px, transparent 0.4px),
            radial-gradient(rgba(125, 86, 86, 0.12) 0.4px, transparent 0.4px);
          background-size: 22px 22px, 29px 29px;
          background-position: 0 0, 11px 13px;
          mix-blend-mode: multiply;
        }
      `}</style>

      {/* ملف الصوت جاهز للتحميل */}
      <audio ref={audioRef} loop src="/audio/music.mp3" preload="auto" />

      {/* شاشة الترحيب اللي بتغطي الموقع في الأول */}
      <AnimatePresence>
        {!isInvOpen && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#f7efec] paper-glow grain"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="text-center flex flex-col items-center"
            >
              <div className="mb-10 text-center">
                <div className="font-hero text-[58px] leading-[1.02] text-[#6f4c4c] drop-shadow-sm">
                  أحمد
                </div>
                <div className="my-1 text-[20px] text-[#ba8585]">&</div>
                <div className="font-hero text-[58px] leading-[1.02] text-[#6f4c4c] drop-shadow-sm">
                  سارة
                </div>
              </div>

              <motion.button
                onClick={handleOpenInvitation}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group relative overflow-hidden rounded-full bg-[#7b5b5b] px-8 py-4 text-[16px] font-semibold text-white shadow-[0_10px_30px_rgba(123,91,91,0.3)] transition-colors hover:bg-[#8b6868]"
              >
                اضغط لفتح الدعوة 🤍
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* زر الصوت العائم (هيظهر بس بعد ما الدعوة تتفتح) */}
      <button
        onClick={toggleAudio}
        className={`fixed bottom-6 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full border border-white/60 bg-white/70 text-[#6f4c4c] shadow-[0_12px_32px_rgba(138,101,101,0.2)] backdrop-blur-md transition-all duration-300 hover:scale-110 active:scale-95 ${!isInvOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
      >
        {isPlaying ? <Volume2 size={22} /> : <VolumeX size={22} />}
      </button>

      <main className="relative mx-auto min-h-screen w-full max-w-[430px] overflow-hidden font-ui paper-glow grain">
        <section className="relative h-[100svh] overflow-hidden">
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            className="absolute inset-0 h-full w-full object-cover"
          >
            <source src="/video/hero.mp4" type="video/mp4" />
          </video>

          <div className="absolute inset-0 bg-gradient-to-b from-black/28 via-black/18 to-[#f7efec]" />
          <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-black/35 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-52 bg-gradient-to-t from-[#f7efec] via-[#f7efec]/78 to-transparent" />

          <div className="relative z-10 flex h-full flex-col justify-center px-4 pb-6 pt-16 text-white text-center">
            
            <motion.div
              initial="hidden"
              animate={isInvOpen ? "visible" : "hidden"}
              variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.12 } } }}
              className="mx-auto w-full max-w-[330px] flex-1 flex flex-col justify-center"
            >
              <motion.p variants={fadeUp} className="font-arabic text-[14px] leading-[2] text-white/88">
                بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
              </motion.p>

              <motion.p
                variants={fadeUp}
                className="mx-auto mt-3 max-w-[295px] font-arabic text-[16px] leading-[2.25] text-white/88"
              >
                ﴿ وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنْفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً ﴾
              </motion.p>

              <motion.div variants={fadeUp} className="mt-5">
                <Divider />
              </motion.div>

              <motion.p variants={fadeUp} className="mt-5 text-[12px] font-semibold tracking-[0.22em] text-white/80">
                ❤️ كتب كتابنا ❤️
              </motion.p>

              <motion.div variants={fadeUp} className="mt-3">
                <div className="font-hero text-[58px] leading-[1.02] text-white drop-shadow-[0_10px_30px_rgba(0,0,0,0.22)]">
                  أحمد
                </div>
                <div className="my-1 text-[16px] tracking-[0.4em] text-[#ffd6d6]">&</div>
                <div className="font-hero text-[58px] leading-[1.02] text-white drop-shadow-[0_10px_30px_rgba(0,0,0,0.22)]">
                  سارة
                </div>
              </motion.div>

              <motion.p variants={fadeUp} className="mx-auto mt-3 max-w-[280px] text-[14px] leading-7 text-white/85">
                فرحتنا هتكمل بوجودك ❤️
              </motion.p>

              <motion.div variants={fadeUp} className="mx-auto mt-5 grid w-full max-w-[280px] gap-2">
                <div className="flex items-center justify-center gap-2 rounded-[22px] border border-white/25 bg-white/14 px-4 py-3 text-white backdrop-blur-md transition-all duration-300 hover:bg-white/20">
                  <CalendarDays size={16} />
                  <span className="text-[14px] font-semibold">19 / 6 / 2026</span>
                </div>
                <div className="flex items-center justify-center gap-2 rounded-[22px] border border-white/25 bg-white/14 px-4 py-3 text-white backdrop-blur-md transition-all duration-300 hover:bg-white/20">
                  <Clock3 size={16} />
                  <span className="text-[14px] font-semibold">الساعة 3:00 مساءً</span>
                </div>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={isInvOpen ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
              transition={{ duration: 0.7, delay: 0.35 }}
              className="mt-8 flex flex-col items-center gap-3"
            >
              <a
                href="#countdown"
                className="group inline-flex items-center gap-2 rounded-full bg-white/90 px-5 py-3 text-[13px] font-semibold text-[#6f4c4c] shadow-[0_16px_35px_rgba(0,0,0,0.14)] backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#f5e7e5] hover:shadow-[0_18px_42px_rgba(0,0,0,0.18)]"
              >
                <Heart size={15} className="transition-transform duration-300 group-hover:scale-110" />
                متابعة الدعوة
              </a>
            </motion.div>
          </div>
        </section>

        <section id="countdown" className="px-4 pt-4 pb-5">
          <motion.div
            className="rounded-[30px] border border-white/80 bg-white/70 p-4 shadow-[0_16px_48px_rgba(129,90,90,0.08)] backdrop-blur-md transition-transform duration-300 hover:-translate-y-0.5 hover:shadow-[0_20px_56px_rgba(129,90,90,0.12)]"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
          >
            <motion.div variants={fadeUp}>
              <SectionTitle
                title="العد التنازلي"
                subtitle=""
              />
            </motion.div>
            <motion.div variants={fadeUp} className="mt-4">
              <Countdown />
            </motion.div>
          </motion.div>
        </section>

        <section className="px-4 pb-5">
          <motion.div
            className="rounded-[32px] overflow-hidden border border-white/80 bg-white/70 p-0 shadow-[0_16px_48px_rgba(129,90,90,0.08)] backdrop-blur-md transition-transform duration-300 hover:-translate-y-0.5 hover:shadow-[0_20px_56px_rgba(129,90,90,0.12)]"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
          >
            <motion.div variants={fadeUp}>
              <div className="overflow-hidden">
                <Image
                  src="/images/couple.jpg"
                  alt="أحمد وسارة"
                  width={1200}
                  height={1500}
                  className="h-auto w-full object-cover"
                  priority={false}
                />
              </div>
            </motion.div>
          </motion.div>
        </section>

        <section className="px-4 pb-5">
          <motion.div
            className="rounded-[30px] border border-white/80 bg-white/70 p-4 shadow-[0_16px_48px_rgba(129,90,90,0.08)] backdrop-blur-md transition-transform duration-300 hover:-translate-y-0.5 hover:shadow-[0_20px_56px_rgba(129,90,90,0.12)]"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
          >
            <motion.div variants={fadeUp}>
              <SectionTitle
                title="مستنيينكم"
                subtitle=""
              />
            </motion.div>

            <motion.div variants={fadeUp} className="mt-5 grid gap-2">
              <div className="flex items-center gap-3 rounded-[22px] border border-white/80 bg-white/75 px-4 py-3 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#fffafa] hover:shadow-[0_14px_28px_rgba(138,101,101,0.10)]">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#f4e4e2] text-[#8b6464]">
                  <CalendarDays size={18} />
                </div>
                <div>
                  <p className="text-[11px] font-semibold tracking-[0.18em] text-[#a57d7d]">التاريخ</p>
                  <p className="mt-1 text-[15px] font-bold text-[#6f4c4c]">19 يونيو 2026</p>
                </div>
              </div>

              <div className="flex items-center gap-3 rounded-[22px] border border-white/80 bg-white/75 px-4 py-3 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#fffafa] hover:shadow-[0_14px_28px_rgba(138,101,101,0.10)]">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#f4e4e2] text-[#8b6464]">
                  <Clock3 size={18} />
                </div>
                <div>
                  <p className="text-[11px] font-semibold tracking-[0.18em] text-[#a57d7d]">الساعة</p>
                  <p className="mt-1 text-[15px] font-bold text-[#6f4c4c]">3:00 مساءً</p>
                </div>
              </div>

              <div className="flex items-center gap-3 rounded-[22px] border border-white/80 bg-white/75 px-4 py-3 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#fffafa] hover:shadow-[0_14px_28px_rgba(138,101,101,0.10)]">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#f4e4e2] text-[#8b6464]">
                  <MapPin size={18} />
                </div>
                <div>
                  <p className="text-[11px] font-semibold tracking-[0.18em] text-[#a57d7d]">المكان</p>
                  <p className="mt-1 text-[15px] font-bold text-[#6f4c4c]">Boulevard Cafe Open Air</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </section>

        <section className="px-4 pb-5">
          <motion.div
            className="rounded-[30px] border border-white/80 bg-white/70 p-4 shadow-[0_16px_48px_rgba(129,90,90,0.08)] backdrop-blur-md transition-transform duration-300 hover:-translate-y-0.5 hover:shadow-[0_20px_56px_rgba(129,90,90,0.12)]"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
          >
            <motion.div variants={fadeUp}>
              <SectionTitle
                title="مكان المناسبة"
                subtitle=""
              />
            </motion.div>
            <motion.div variants={fadeUp} className="mt-5">
              <div className="mb-4 rounded-[24px] border border-white/80 bg-white/75 p-5 text-center shadow-sm">
                <p className="text-[18px] font-bold text-[#6f4c4c]">
                  Boulevard Cafe Open Air
                </p>
                <p className="mt-3 text-[14px] leading-8 text-[#7f6666]">
                  امتداد شارع صلاح سالم
                  <br />
                  أمام بازوكا
                </p>
              </div>

              {/* الخريطة التفاعلية */}
              <div className="relative mb-6 overflow-hidden rounded-[32px] border-[2px] border-white/60 bg-white/30 p-[6px] shadow-[0_20px_50px_rgba(138,101,101,0.15)] backdrop-blur-xl transition-all duration-500 hover:shadow-[0_25px_60px_rgba(138,101,101,0.25)] hover:scale-[1.02]">
                <div className="pointer-events-none absolute inset-0 z-10 rounded-[30px] bg-gradient-to-tr from-white/40 via-white/5 to-white/40 mix-blend-overlay"></div>
                <div className="relative overflow-hidden rounded-[26px] bg-[#e5d5d5]">
                  <iframe
                    src={mapEmbedLink}
                    width="100%"
                    height="240"
                    style={{ border: 0, filter: 'saturate(1.1) opacity(0.95)' }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
              </div>

              <a
                href={mapsLink}
                target="_blank"
                rel="noreferrer"
                className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#7b5b5b] px-5 py-3 text-[14px] font-semibold text-white shadow-[0_16px_34px_rgba(122,90,90,0.22)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#8e6969] hover:shadow-[0_18px_42px_rgba(122,90,90,0.28)] active:scale-[0.98]"
              >
                <Navigation size={16} className="transition-transform duration-300 group-hover:translate-x-0.5" />
                فتح الاتجاهات
              </a>
            </motion.div>
          </motion.div>
        </section>

        <section className="px-4 pb-8">
          <div className="rounded-[30px] border border-white/80 bg-white/70 px-4 py-8 text-center shadow-[0_16px_48px_rgba(129,90,90,0.08)] backdrop-blur-md">
            <Divider />
            <p className="mt-5 font-arabic text-[28px] text-[#6f4c4c]">
              مستنيينكم 🤍
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}