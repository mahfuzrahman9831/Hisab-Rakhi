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
    return [];
  });

  const [activeBusinessId, setActiveBusinessId] = useState(() => {
    return localStorage.getItem("activeBusinessId") || "biz_default";
  });

  // ✅ shopInfo save হলে default business sync করো
  useEffect(() => {
    const shopInfo = localStorage.getItem("shopInfo");
    if (!shopInfo) return;

    const shop = JSON.parse(shopInfo);
    if (!shop?.shopName) return;

    setBusinesses((prev) => {
      // ✅ biz_default আগে থেকে আছে কিনা চেক করো
      const defaultExists = prev.find((b) => b.id === "biz_default");

      if (defaultExists) {
        // ✅ আছে — name/address আপডেট করো
        return prev.map((b) =>
          b.id === "biz_default"
            ? {
                ...b,
                name: shop.shopName,
                address: shop.shopAddress || b.address,
              }
            : b
        );
      } else {
        // ✅ নেই — নতুন default বানাও
        const defaultBiz = {
          id: "biz_default",
          name: shop.shopName,
          address: shop.shopAddress || "",
          createdAt: new Date().toISOString(),
        };
        return [defaultBiz, ...prev];
      }
    });
  }, []); // ✅ mount এ একবার run করবে

  useEffect(() => {
    localStorage.setItem("businesses", JSON.stringify(businesses));
  }, [businesses]);

  useEffect(() => {
    localStorage.setItem("activeBusinessId", activeBusinessId);
  }, [activeBusinessId]);

  const activeBusiness =
    businesses.find((b) => b.id === activeBusinessId) || businesses[0];

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
    <BusinessContext.Provider
      value={{
        businesses,
        activeBusiness,
        activeBusinessId,
        addBusiness,
        switchBusiness,
      }}
    >
      {children}
    </BusinessContext.Provider>
  );
}

export function useBusiness() {
  return useContext(BusinessContext);
}