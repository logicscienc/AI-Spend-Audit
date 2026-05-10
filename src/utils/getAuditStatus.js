export function getAuditStatus(item) {

  if (item.monthlySavings > 0) {
    return {
      label: "Overpaying",
      color:
        "bg-red-500/15 text-red-300 border-red-500/20",
    };
  }

  if (
    item.recommendation
      ?.toLowerCase()
      .includes("review")
  ) {
    return {
      label: "Review",
      color:
        "bg-yellow-500/15 text-yellow-300 border-yellow-500/20",
    };
  }

  if (
    item.recommendation
      ?.toLowerCase()
      .includes("evaluate")
  ) {
    return {
      label: "Consider Change",
      color:
        "bg-blue-500/15 text-blue-300 border-blue-500/20",
    };
  }

  return {
    label: "Optimal",
    color:
      "bg-green-500/15 text-green-300 border-green-500/20",
  };
}