const Footer = () => {
  return (
    <footer className="bg-white py-10 px-6 border-t border-gray-200">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Logo and Description */}
        <div>
          <div className="text-2xl font-bold text-blue-600 mb-4">MORENT</div>
          <p className="text-gray-600">
            Our vision is to provide convenience and help increase your sales
            business.
          </p>
        </div>

        {/* About Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4">About</h3>
          <ul className="space-y-2 text-gray-600">
            <li>
              <a href="#" className="hover:text-blue-600">
                How it works
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-600">
                Featured
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-600">
                Partnership
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-600">
                Business Relation
              </a>
            </li>
          </ul>
        </div>

        {/* Community Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Community</h3>
          <ul className="space-y-2 text-gray-600">
            <li>
              <a href="#" className="hover:text-blue-600">
                Events
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-600">
                Blog
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-600">
                Podcast
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-600">
                Invite a friend
              </a>
            </li>
          </ul>
        </div>

        {/* Socials Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Socials</h3>
          <ul className="space-y-2 text-gray-600">
            <li>
              <a href="#" className="hover:text-blue-600">
                Discord
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-600">
                Instagram
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-600">
                Twitter
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-600">
                Facebook
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="mt-8 pt-6 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center">
        <p className="text-gray-500">©2025 MORENT. All rights reserved</p>
        <div className="space-x-6 text-gray-600">
          <a href="#" className="hover:text-blue-600">
            Privacy & Policy
          </a>
          <a href="#" className="hover:text-blue-600">
            Terms & Condition
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;