import QRCode from "qrcode";

export const SITE_URL = "https://daeng-mamangung-siruntu.vercel.app";

export function siteQrSvg() {
  return QRCode.toString(SITE_URL, {
    type: "svg",
    margin: 0,
    errorCorrectionLevel: "M",
    color: { dark: "#0b2a4a", light: "#ffffff" },
  });
}
