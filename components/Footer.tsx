import Link from "next/link";
import { FaXTwitter } from "react-icons/fa6";
import { FaFacebook } from "react-icons/fa";
import { GrInstagram } from "react-icons/gr";
import Image from "next/image";

const Footer = () => {
  const date = new Date();

  return (
    <footer className="w-full p-14 bg-black text-white flex justify-center">
      <div className="flex items-center">
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
        {/* grid grid-cols-2 md:grid-cols-3 gap-4 mb-6 */}
        <div className="flex flex-col items-center">
          <div className="flex gap-4">
            <div className="flex flex-col">
              <h1>Company</h1>
              <Link href="/about-us" className="hover:underline">
                About Us
              </Link>
              <Link href="/contact" className="hover:underline">
                Contact Us
              </Link>
              <Link href="/profiles" className="hover:underline">
                Profiles
              </Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6 ">
              <Link href="/politics" className="hover:underline">
                Politics
              </Link>
              <Link href="/innovation" className="hover:underline">
                Innovation
              </Link>
              <Link href="/culture" className="hover:underline">
                Culture
              </Link>
              <Link href="/entertainment" className="hover:underline">
                Entertainment
              </Link>
              <Link href="/sports" className="hover:underline">
                Sports
              </Link>
              <Link href="/technology" className="hover:underline">
                Technology
              </Link>
            </div>
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
