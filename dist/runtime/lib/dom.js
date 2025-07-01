export const typewatch = /* @__PURE__ */ function() {
  var timer;
  return function(callback, ms) {
    clearTimeout(timer);
    timer = setTimeout(callback, ms);
  };
}();
export async function download(blob, name) {
  if (!blob) return;
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = name;
  link.click();
  URL.revokeObjectURL(link.href);
}
export async function share(blob, name) {
  if (!blob) return;
  const file = new File([blob], name, { type: blob.type });
  await navigator.share({
    files: [file]
  });
}
export async function downloadUrl(dataUrl, name) {
  const link = document.createElement("a");
  link.href = dataUrl;
  link.download = name;
  link.click();
  URL.revokeObjectURL(link.href);
}
