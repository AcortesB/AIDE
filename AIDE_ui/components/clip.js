function Clip({ url }) {
    return (
      <video key={url}>
        <source src={url} />
      </video>
    );
  }


  export default Clip; // Export the component