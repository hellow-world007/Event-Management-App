import classes from "./form-el.module.css";
import { useState } from "react";
import Image from "next/image";

function FormElement(props) {
  const [searchInput, setSearchInput] = useState("");
  const [selectInput, setSelectInput] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    props.onSearch(searchInput, selectInput);
  }

  const imagePath = "/icons/search.svg";

  return (
    <form className={classes.form} onSubmit={handleSubmit}>
      <div className={classes.controls}>
        <div className={classes.search}>
          <Image
            src={imagePath}
            className={classes.faSearch}
            alt="My IMAGE"
            width={20}
            height={20}
          />
          <input
            type="search"
            placeholder="Search title..."
            value={searchInput}
            onChange={(event) => setSearchInput(event.target.value)}
          />
        </div>
        <select
          id="month"
          value={selectInput}
          onChange={(event) => setSelectInput(event.target.value)}
        >
          <option value="All">All</option>
          <option value="NextJS">NextJS</option>
          <option value="UI/UX">UI/UX</option>
          <option value="Development">Development</option>
          <option value="Tech">Tech</option>
          <option value="Artificial Intelligence">
            Artificial Intelligence
          </option>
        </select>
      </div>
    </form>
  );
}

export default FormElement;
