export default function foo() {
  const arr1 = [1, 2, 3, 4, 5, 6, 7, 8];
  const arr2 = [];
  return (
    <div>
      {arr1.map((value: number) => {
        if (value % 2 == 0) {
          return <p key={value}> {value} </p>;
        }
      })}
    </div>
  );
}

/* function bar() {

} */
