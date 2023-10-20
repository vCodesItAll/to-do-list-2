/*


                                         $$\                         
                                         $$ |                        
 $$$$$$$\  $$$$$$\  $$\   $$\ $$$$$$$\ $$$$$$\    $$$$$$\   $$$$$$\  
$$  _____|$$  __$$\ $$ |  $$ |$$  __$$\\_$$  _|  $$  __$$\ $$  __$$\ 
$$ /      $$ /  $$ |$$ |  $$ |$$ |  $$ | $$ |    $$$$$$$$ |$$ |  \__|
$$ |      $$ |  $$ |$$ |  $$ |$$ |  $$ | $$ |$$\ $$   ____|$$ |      
\$$$$$$$\ \$$$$$$  |\$$$$$$  |$$ |  $$ | \$$$$  |\$$$$$$$\ $$ |      
 \_______| \______/  \______/ \__|  \__|  \____/  \_______|\__|      
                                                                                                                                        
                                                                    
*/


// Define a functional component called Counter that accepts a prop 'items'.
export default function Counter({ items }) {
    // Create a new array 'remainingItems' by filtering 'items' to find uncompleted items.
    const remainingItems = items.filter((item) => !item.completed);
    
    // Return a <div> element with the CSS class 'counter' that displays the count of remaining items.
    return <div className="counter">{remainingItems.length} items remaining</div>;
  }
  