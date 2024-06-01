export function getCategoryByPosition(uniqueViewsHistory, position) {
  const categoriesCount = {};

  uniqueViewsHistory.forEach((item) => {
    const category = item.category;
    categoriesCount[category] = (categoriesCount[category] || 0) + 1;
  });

  const counts = Object.values(categoriesCount).sort((a, b) => b - a);
  const uniqueCounts = Array.from(new Set(counts));

  if (position <= uniqueCounts.length) {
    const targetCount = uniqueCounts[position - 1];

    for (const category in categoriesCount) {
      if (categoriesCount.hasOwnProperty(category)) {
        if (categoriesCount[category] === targetCount) {
          return category;
        }
      }
    }
  }

  return null;
}
