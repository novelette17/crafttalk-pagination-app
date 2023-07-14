import { useCallback, useEffect, useState } from "react";
import { useLazyGetProductsQuery } from "./api/main";
import { debounce } from "./api/utils";

const SKIP_NUM_DIFF = 20;

const Grid = () => {
  const [getProductsList, productsList] = useLazyGetProductsQuery();
  const [skip, setSkip] = useState(0);
  const [searchStr, setSearchStr] = useState("");

  const responseData = productsList.data;
  const responseSkip = Number(responseData?.skip) || 0;
  const responseTotal = Number(responseData?.total) || 0;

  const isNextDisabled = responseTotal <= SKIP_NUM_DIFF + responseSkip;
  const isPrevDisabled = !responseSkip;

  useEffect(() => {
    getProductsList({
      limit: SKIP_NUM_DIFF,
      search: searchStr,
      skip,
    });
  }, [skip, searchStr]);

  const handleSearch = useCallback(
    debounce((e: React.ChangeEvent<HTMLInputElement>) => {
      if (skip) {
        setSkip(0);
      }

      setSearchStr(e.target.value);
    }, 500),
    [skip],
  );

  const handleNavigate = useCallback(
    (dir: "prev" | "next") => {
      if (dir === "next") {
        setSkip(responseSkip + SKIP_NUM_DIFF);
      }

      if (dir === "prev" && responseSkip - SKIP_NUM_DIFF >= 0) {
        setSkip(responseSkip - SKIP_NUM_DIFF);
      }
    },
    [responseSkip, searchStr],
  );

  if (!responseData?.products.length) {
    return <div>Загрузка...</div>;
  }

  return (
    <div>
      <input className="search-field" type="text" onChange={handleSearch} />
      <table border={0}>
        <thead>
          <tr>
            <th>Title</th>
            <th>Price, $</th>
          </tr>
        </thead>
        <tbody>
          {responseData?.products.map((x) => (
            <tr key={x.id}>
              <td>{x.title}</td>
              <td>${x.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="manage">
        <button
          disabled={isPrevDisabled}
          onClick={() => handleNavigate("prev")}
        >
          Prev
        </button>
        <button
          disabled={isNextDisabled}
          onClick={() => handleNavigate("next")}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Grid;
