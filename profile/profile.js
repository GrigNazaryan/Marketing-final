function copyToClipboard() {
    const text = document.getElementById("copyText").innerText;
    navigator.clipboard.writeText(text).then(() => {
      const tooltip = document.getElementById("copyTooltip");
      tooltip.classList.add("show");
      setTimeout(() => {
        tooltip.classList.remove("show");
      }, 2000);
    });
  }