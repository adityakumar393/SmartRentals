function detectUrgency(text) {
  const highKeywords = ["fire", "flood", "gas leak", "danger", "emergency", "accident", "broken pipe"];
  const lowKeywords = ["dust", "paint", "small crack", "spider", "fan noise"];

  text = text.toLowerCase();

  if (highKeywords.some(word => text.includes(word))) return "High";
  if (lowKeywords.some(word => text.includes(word))) return "Low";
  return "Medium";
}

module.exports = detectUrgency;
