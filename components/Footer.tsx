import Link from "next/link";
import { FaXTwitter } from "react-icons/fa6";
import { FaFacebook } from "react-icons/fa";
import { GrInstagram } from "react-icons/gr";
import Image from "next/image";

const Footer = () => {
  const date = new Date();

  return (
    <footer className="w-full p-14 bg-black text-white flex justify-center">
      <div className="flex items-center ">
        <div className="mr-10 md:text-3xl text-xl">
          <Link href="/">
            <Image
              src="/favicon.svg"
              height={150}
              width={150}
              alt="The vybe news logo"
            />
          </Link>
        </div>
        <div className="flex flex-col items-center">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
            <Link href="/politics">Politics</Link>
            <Link href="/innovation">Innovation</Link>
            <Link href="/culture">Culture</Link>
            <Link href="/entertainment">Entertainment</Link>
            <Link href="/sports">Sports</Link>
            <Link href="/technology">Technology</Link>
          </div>
          <div>
            <div className="flex gap-4">
              <span>Follow Us:</span>
              <div className="flex items-center gap-3 md:text-2xl text-xl">
                <Link target="_blank" href="https://x.com/TheVybeNews">
                  <FaXTwitter />
                </Link>

                <Link
                  target="_blank"
                  href="https://www.facebook.com/profile.php?id=61584671907641"
                >
                  <FaFacebook />
                </Link>
                <Link
                  target="_blank"
                  href="https://www.instagram.com/thevybenews"
                >
                  <GrInstagram />
                </Link>
              </div>
            </div>
          </div>
          <div className="mt-3">
            <span>Copyright: {date.getFullYear()}</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
