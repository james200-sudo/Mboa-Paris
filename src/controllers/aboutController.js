exports.getAbout = (req, res) => {
    res.status(200).json({
      appName: "Mboa Paris",
      version: "1.0.0",
      description: "Plateforme communautaire de mise en relation, événements, et entreprises africaines à Paris.",
      partenaires: [
        { name: "AfricTech", url: "https://africtech.com" },
        { name: "DiasporaConnect", url: "https://diaspora-connect.org" }
      ],
      contactEmail: "support@mboaparis.com"
    });
  };
  