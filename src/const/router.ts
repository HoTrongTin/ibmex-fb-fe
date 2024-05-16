const PATH_NAME_LOCAL = {
    LOGIN: "/dang-nhap",
    RANGKING: "/bang-xep-hang",
    RULE: "/the-le-tro-choi",
};

const PATH_NAME_PROD = {
    LOGIN: "/dang-nhap.html",
    RANGKING: "/bang-xep-hang.html",
    RULE: "/the-le-tro-choi.html",
};

const PATH_NAME = process.env.NEXT_PUBLIC_MODE === "local" ? PATH_NAME_LOCAL : PATH_NAME_PROD;

export default PATH_NAME;
