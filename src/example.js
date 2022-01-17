import {
  FieldDictionary,
  FilterBuilder,
  Filter,
  Input,
  Pagination,
  Results,
  ResultsPerPage,
  SearchProvider,
  Sorting,
  Summary,
  ViewType,
  Pipeline,
  RangeFilterBuilder,
} from '@sajari/react-search-ui';

import { 
  useSearchContext 
} from '@sajari/react-hooks';

import React from 'react';

function Example() {
  const pipeline = new Pipeline(
    {
      account: '1594153711901724220',
      collection: 'bestbuy',
    },
    'query',
  );

  const fields = new FieldDictionary({
    title: 'name',
    subtitle: (data) => data.level4 || data.level3 || data.level2 || data.level1 || data.brand,
  });

  const brandFilter = new FilterBuilder({
    name: 'brand',
    field: 'brand',
  });

  const categoryFilter = new FilterBuilder({
    name: 'level1',
    field: 'level1',
  });

  const colorFilter = new FilterBuilder({
    name: 'color',
    field: 'imageTags',
    array: true,
  });

  const priceFilter = new RangeFilterBuilder({
    name: 'price',
    field: 'price',
  });

  const ratingFilter = new FilterBuilder({
    name: 'rating',
    field: 'rating',
  });

  const App = React.memo(() => {
    const { searched } = useSearchContext();

    return (
      <>
        <Input />

        <div className="flex items-center justify-end mt-3">
          <Summary size="sm" />

          <div className="flex space-x-4 ml-auto">
            <Sorting
              options={[
                { name: 'Most relevant', value: '' },
                { name: 'Brand: A to Z', value: 'brand' },
                { name: 'Brand: Z to A', value: '-brand' },
                { name: 'Rating: Low to High', value: 'rating' },
                { name: 'Rating: High to Low', value: '-rating' },
                { name: 'Popularity', value: 'popularity' },
              ]}
              size="sm"
            />
            <ResultsPerPage size="sm" />
            <ViewType size="sm" />
          </div>
        </div>

        <div className="flex mt-6">
          {searched && (
            <div className="w-1/4 pr-4 border-gray-100 border-r space-y-6">
              <Filter type="list" name="brand" title="Brand" searchable />
              <Filter type="list" name="level1" title="Category" searchable />
              <Filter type="range" name="price" title="Price" format="price" />
              <Filter type="color" name="color" title="Color" />
              <Filter type="rating" name="rating" title="Rating" />
            </div>
          )}

          <div className="flex-1 pl-4">
            <Results />
          </div>
        </div>

        <div className="sticky bottom-0 p-6">
          <Pagination />
        </div>
      </>
    );
  });

  return (
    <SearchProvider
      search={{
        pipeline,
        fields,
        filters: [categoryFilter, priceFilter, colorFilter, ratingFilter, brandFilter],
      }}
      searchOnLoad
    >
      <App />
    </SearchProvider>
  );
}

export default Example;