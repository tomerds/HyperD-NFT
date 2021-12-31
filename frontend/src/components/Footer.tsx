const Footer = () => {
  return (
    <div className="flex space-x-10 justify-center mb-20 mt-10">
      <div className="rounded-full bg-gray-300 h-14 w-14 flex justify-center items-center hover:bg-gray-400">
        <a
          href="https://mobile.twitter.com/marcusdusautoy"
          target="_blank"
          rel="noreferrer"
        >
          <img
            src="/images/Twitter-Logo-White.svg"
            alt="twitter"
            className="h-10 w-10"
          />
        </a>
      </div>

      <div className="rounded-full bg-gray-300 h-14 w-14 flex justify-center items-center hover:bg-gray-400">
        <a
          href="https://discord.gg/3BzjsjAdc7"
          target="_blank"
          rel="noreferrer"
        >
          <img
            src="/images/Discord-Logo-White.svg"
            alt="twitter"
            className="h-10 w-10"
          />
        </a>
      </div>
    </div>
  );
};

export default Footer;
