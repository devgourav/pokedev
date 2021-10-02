<script lang="ts">
  import { quotes } from "../data/quotes";

  let randomNumber = Math.floor(Math.random() * quotes.length);

  let quote: { text: string; quoted_by: string } = quotes[randomNumber];
</script>

<div class="loader-container">
  <img class="loader" src="assets/pokeball.png" alt="Pokeball loader" />

  {#if quote}
    <p>{quote.text}</p>
    <div>- {quote.quoted_by}</div>
  {/if}
</div>

<style>
  .loader-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    text-align: center;
    flex-direction: column;
    font-weight: bold;
  }

  .loader {
    -webkit-animation: spin 1s linear infinite;
    -moz-animation: spin 1s linear infinite;
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    100% {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }

  @-moz-keyframes spin {
    100% {
      -moz-transform: rotate(360deg);
    }
  }
  @-webkit-keyframes spin {
    100% {
      -webkit-transform: rotate(360deg);
    }
  }
</style>
