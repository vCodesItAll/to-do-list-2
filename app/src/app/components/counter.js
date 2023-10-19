export default function Counter({ items }) {
    const remainingItems = items.filter((item) => !item.completed);
    return <div className="counter">{remainingItems.length} items remaining</div>;
  }