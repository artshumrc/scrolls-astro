<template>
    <div class="search-bar">
      <input
        type="text"
        :value="searchTerm"
        @input="$emit('update:searchTerm', $event.target.value)"
        :placeholder="placeholder"
        class="search-input"
        aria-label="Search the site"
      />
    </div>
  </template>
  
  <script>
  export default {
    props: {
      searchTerm: {
        type: String,
        required: true,
      },
      placeholder: {
        type: String,
        default: 'Search...',
      },
    },
  };
  </script>
  
  <style scoped>
  .search-bar {
    position: relative;
    display: flex;
    align-items: center;
    width: 100%;
    border: 1px solid #ccc;
    border-radius: 4px;
    background-color: #f9f9f9;
    height: 50px;
  }
  
  .search-bar::before {
    content: "";
    position: absolute;
    background-color: #888;
    width: 18px;
    height: 18px;
    top: 50%;
    left: 10px;
    transform: translateY(-50%);
    opacity: 0.7;
    -webkit-mask-image: url("data:image/svg+xml,%3Csvg width='18' height='18' viewBox='0 0 18 18' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M12.7549 11.255H11.9649L11.6849 10.985C12.6649 9.845 13.2549 8.365 13.2549 6.755C13.2549 3.165 10.3449 0.255005 6.75488 0.255005C3.16488 0.255005 0.254883 3.165 0.254883 6.755C0.254883 10.345 3.16488 13.255 6.75488 13.255C8.36488 13.255 9.84488 12.665 10.9849 11.685L11.2549 11.965V12.755L16.2549 17.745L17.7449 16.255L12.7549 11.255ZM6.75488 11.255C4.26488 11.255 2.25488 9.245 2.25488 6.755C2.25488 4.26501 4.26488 2.255 6.75488 2.255C9.24488 2.255 11.2549 4.26501 11.2549 6.755C11.2549 9.245 9.24488 11.255 6.75488 11.255Z' fill='%23000000'/%3E%3C/svg%3E%0A");
    mask-image: url("data:image/svg+xml,%3Csvg width='18' height='18' viewBox='0 0 18 18' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M12.7549 11.255H11.9649L11.6849 10.985C12.6649 9.845 13.2549 8.365 13.2549 6.755C13.2549 3.165 10.3449 0.255005 6.75488 0.255005C3.16488 0.255005 0.254883 3.165 0.254883 6.755C0.254883 10.345 3.16488 13.255 6.75488 13.255C8.36488 13.255 9.84488 12.665 10.9849 11.685L11.2549 11.965V12.755L16.2549 17.745L17.7449 16.255L12.7549 11.255ZM6.75488 11.255C4.26488 11.255 2.25488 9.245 2.25488 6.755C2.25488 4.26501 4.26488 2.255 6.75488 2.255C9.24488 2.255 11.2549 4.26501 11.2549 6.755C11.2549 9.245 9.24488 11.255 6.75488 11.255Z' fill='%23000000'/%3E%3C/svg%3E%0A");
    -webkit-mask-size: 100%;
    mask-size: 100%;
    z-index: 9;
    pointer-events: none;
  }
  
  .search-input {
    flex: 1;
    border: none;
    outline: none;
    font-size: 1em;
    background-color: transparent;
    color: #333;
    padding-left:35px;
    height: 100%;
    line-height: 1.5;
    margin-bottom: 0;
  }
  
  .search-input::placeholder {
    color: #aaa;
  }
  </style>