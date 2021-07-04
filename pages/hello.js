const hello = () => {
  const handleClick = async () => {
    const response = await fetch("/api/menus", {
      method: "POST",
      body: JSON.stringify({ email: "hello", password: "1234" }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    // const data = await response.json();
    // console.log(data);
  };
  return (
    <div>
      <button onClick={handleClick}>click</button>
    </div>
  );
};

export default hello;
