declare global {
    interface Window {
        MSStream: any;
    }
}

export enum DEVICES {
    ANDROID = "ANDROID",
    IOS = "IOS",
    WINDOW_PHONE = "WINDOW_PHONE",
}

export const getMobileOperatingSystem = () => {
    if (typeof window === "undefined") return;
    var userAgent = navigator.userAgent || navigator.vendor;

    // Windows Phone must come first because its UA also contains "Android"
    if (/windows phone/i.test(userAgent)) {
        return DEVICES.WINDOW_PHONE;
    }

    if (/android/i.test(userAgent)) {
        return DEVICES.ANDROID;
    }

    // iOS detection from: http://stackoverflow.com/a/9039885/177710
    if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
        return DEVICES.IOS;
    }

    return "unknown";
};

export const isIOS = () => {
    const device = getMobileOperatingSystem();

    return device === DEVICES.IOS;
};

export const isUsingMobile = () => {
    const device = getMobileOperatingSystem();

    return device === DEVICES.ANDROID || device === DEVICES.IOS;
};