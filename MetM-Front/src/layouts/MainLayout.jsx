const MainLayout = ({ children }) => {
  return (
    <div>
      <header>
        <h1>Marcelle & Maurice Shop</h1>
      </header>
      <main>{children}</main>
      <footer>
        <p>© 2025 - Tous droits réservés</p>
      </footer>
    </div>
  );
};

export default MainLayout;
