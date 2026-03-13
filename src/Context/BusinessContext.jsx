import { createContext, useContext, useState, useEffect } from "react";

const BusinessContext = createContext({
  businesses: [],
  activeBusiness: null,
  activeBusinessId: "biz_default",
  addBusiness: () => {},
  switchBusiness: () => {},
});

export function BusinessProvider({ children }) {
  const [businesses, setBusinesses] = useState(() => {
    const stored = localStorage.getItem("businesses");
    if (stored) return JSON.parse(stored);
    // ✅ প্রথমবার — shopInfo থেকে default business বানাও
    const shopInfo = localStorage.getItem("shopInfo");
    if (shopInfo) {
      const shop = JSON.parse(shopInfo);
      const defaultBiz = {
        id: "biz_default",
        name: shop.shopName || "আমার ব্যবসা",
        address: shop.shopAddress || "",
        createdAt: new Date().toISOString(),
      };
      localStorage.setItem("businesses", JSON.stringify([defaultBiz]));
      return [defaultBiz];
    }
    return [];
  });

  const [activeBusinessId, setActiveBusinessId] = useState(() => {
    return localStorage.getItem("activeBusinessId") || "biz_default";
  });

  useEffect(() => {
    localStorage.setItem("businesses", JSON.stringify(businesses));
  }, [businesses]);

  useEffect(() => {
    localStorage.setItem("activeBusinessId", activeBusinessId);
  }, [activeBusinessId]);

  const activeBusiness = businesses.find((b) => b.id === activeBusinessId) || businesses[0];

  const addBusiness = (name, address) => {
    const newBiz = {
      id: "biz_" + Date.now(),
      name,
      address,
      createdAt: new Date().toISOString(),
    };
    setBusinesses((prev) => [...prev, newBiz]);
    return newBiz;
  };

  const switchBusiness = (id) => {
    setActiveBusinessId(id);
  };

  return (
    <BusinessContext.Provider value={{
      businesses,
      activeBusiness,
      activeBusinessId,
      addBusiness,
      switchBusiness,
    }}>
      {children}
    </BusinessContext.Provider>
  );
}

export function useBusiness() {
  return useContext(BusinessContext);
}