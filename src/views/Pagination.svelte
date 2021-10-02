<script lang="ts">
  import { createEventDispatcher, onMount } from "svelte";

  import { pageOptions, pageSelected, totalItemCount } from "../stores";

  const PAGE_NO_LEN = 10;
  const dispatch = createEventDispatcher();

  let paginationArr = [null];
  let fullPaginationArr = [null];
  let selectedPage = 1;
  let pageCount = 1;
  export let pageOpt;

  onMount(() => {
    updatePageCount();
  });

  pageOptions.subscribe((value) => {
    console.log(
      "🚀 ~ file: Pagination.svelte ~ line 18 ~ totalItemCount.subscribe ~ res",
      value
    );
    pageOpt = value;
    updatePageCount();
  });

  function updatePageCount() {
    pageCount = Math.ceil(pageOpt.totalItemCount / pageOpt.itemsInPage);

    fullPaginationArr = new Array(pageCount)
      .fill(null)
      .map((val, index) => index);
    paginationArr = fullPaginationArr.slice(0, PAGE_NO_LEN);
  }

  function pageClick(pageNo) {
    if (pageNo !== selectedPage) {
      if (pageNo > 0 && pageNo <= pageCount) {
        selectedPage = pageNo;
      } else if (pageNo > pageCount) {
        selectedPage = pageCount;
      } else {
        selectedPage = 1;
      }

      pageSelected.update((value) => selectedPage);

      let startIndex = selectedPage - Math.floor(PAGE_NO_LEN / 2);
      let endIndex = selectedPage + Math.floor(PAGE_NO_LEN / 2);

      if (startIndex < 0) {
        paginationArr = fullPaginationArr.slice(0, PAGE_NO_LEN);
      } else if (endIndex > pageCount) {
        paginationArr = fullPaginationArr.slice(
          pageCount - PAGE_NO_LEN,
          pageCount
        );
      } else {
        paginationArr = fullPaginationArr.slice(startIndex, endIndex);
      }

      dispatch("pageChange", { selectedPage });
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
    border: 1px solid #3c3399;
    cursor: pointer;
    border-radius: 4px;
  }

  .number-btn {
    width: 16px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .pagination-btn:hover,
  .activeBtn {
    background-color: #3c3399;
    color: white;
  }

  .pagination-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 2rem;
  }

  .button-list {
    display: flex;
  }

  .page-no {
    font-weight: 700;
    margin-top: 1rem;
  }
</style>
