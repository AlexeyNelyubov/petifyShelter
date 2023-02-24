function checkBreedInput() {
    if (BreedInput.value === "Введите породу") {
      BreedInput.value = "";
    }
  }
  
  function getCheckedfiltersWithRouting() {
    if (FiltersStore.filters[props.itemForFilter.general[0]].length) {
      for (let index in FiltersStore.filters) {
        if (index === props.itemForFilter.general[0]) {
          filters = [];
          for (let item of FiltersStore.filters[index]) {
            filters.push(item);
          }
          Checkedfilters.value = filters;
        }
      }
    }
  }
  
  function getFilterItems(compareItem) {
    filterItems.value = {};
    for (let index in props.itemForFilter) {
      let filterItem = [];
      if (index != compareItem) {
        for (let el of props.itemForFilter[index]) {
          filterItem.push(el);
          lenghtfilterItems.value++;
        }
        filterItems.value[index] = filterItem;
      }
    }
  }
  
  function getFilterItemsForBreedDependsOfType() {
    if (props.ArrTypeFilter.length) {
      filterItems.value = {};
      for (let item of props.ArrTypeFilter) {
        for (let index in props.itemForFilter) {
          let filterItem = [];
          if (item === index) {
            for (let el of props.itemForFilter[item]) {
              filterItem.push(el);
            }
            filterItems.value[index] = filterItem;
          }
        }
      }
    } else {
      getFilterItems("general");
    }
  }