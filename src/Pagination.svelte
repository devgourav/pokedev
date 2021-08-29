<script lang="ts">
  import { pokeCount, limitValue } from "./stores";

  const PAGE_NO_LEN = 10;

  let paginationArr = [null];
  let fullPaginationArr = [null];
  let selectedPage = 1;
  let pageCount = 1;

  pokeCount.subscribe((value) => {
    const count = value;

    if (value > 0) {
      pageCount = Math.floor(count / $limitValue);
    }

    fullPaginationArr = new Array(pageCount)
      .fill(null)
      .map((val, index) => index);
    paginationArr = fullPaginationArr.slice(0, PAGE_NO_LEN);
  });

  function pageClick(pageNo) {
    if (pageNo > 0 && pageNo <= pageCount) {
      selectedPage = pageNo;
    } else if (pageNo > pageCount) {
      selectedPage = pageCount;
    } else {
      selectedPage = 1;
    }

    if (selectedPage + PAGE_NO_LEN - 1 <= pageCount) {
      paginationArr = fullPaginationArr.slice(
        selectedPage - 1,
        selectedPage + PAGE_NO_LEN - 1
      );
    } else {
      paginationArr = fullPaginationArr.slice(
        pageCount - PAGE_NO_LEN,
        pageCount
      );
    }
  }
</script>

<div class="pagination-container">
  <div class="pagination-list">
    <div class="pagination-btn option-btn" on:click={() => pageClick(1)}>
      First
    </div>
    <div
      class="pagination-btn option-btn"
      on:click={() => pageClick(selectedPage - 1)}
    >
      Previous
    </div>

    <div class="button-list">
      {#each paginationArr as page}
        <div
          class="pagination-btn number-btn"
          class:activeBtn={selectedPage === page + 1}
          on:click={() => pageClick(page + 1)}
        >
          {page + 1}
        </div>
      {/each}
    </div>

    <div
      class="pagination-btn option-btn"
      on:click={() => pageClick(selectedPage + 1)}
    >
      Next
    </div>
    <div
      class="pagination-btn option-btn"
      on:click={() => pageClick(pageCount)}
    >
      Last
    </div>
  </div>
  <div class="page-no">
    {selectedPage}/{pageCount}
  </div>
</div>

<style>
  .pagination-list {
    display: flex;
    justify-content: center;
  }
  .pagination-btn {
    padding: 0.7rem;
    margin: 1rem;
    border: 1px solid blue;
    cursor: pointer;
    border-radius: 4px;
  }

  .number-btn {
    width: 16px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .option-btn {
  }

  .pagination-btn:hover,
  .activeBtn {
    background-color: blue;
    color: white;
  }

  .pagination-container {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .button-list {
    display: flex;
  }

  .page-no {
    font-weight: 700;
    margin-top: 1rem;
  }
</style>
