const Footer = () => {
  return (
    <footer className="footer footer-center p-4 bg-primary mt-16 text-lg sm:text-xl  text-white">
      <p>
        {" "}
        &copy;{new Date().getFullYear()} Made by Yan Yang and Brice Arnaud
        Habenicht
      </p>
    </footer>
  );
};

export default Footer;
