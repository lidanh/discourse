module("GameOfForums.Category");

test('slugFor', function(){

  var slugFor = function(cat, val, text) {
    equal(GameOfForums.Category.slugFor(cat), val, text);
  };

  slugFor(GameOfForums.Category.create({slug: 'hello'}), "hello", "It calculates the proper slug for hello");
  slugFor(GameOfForums.Category.create({id: 123, slug: ''}), "123-category", "It returns id-category for empty strings");
  slugFor(GameOfForums.Category.create({id: 456}), "456-category", "It returns id-category for undefined slugs");
  slugFor(GameOfForums.Category.create({slug: '熱帶風暴畫眉'}), "熱帶風暴畫眉", "It can be non english characters");

  var parentCategory = GameOfForums.Category.create({id: 345, slug: 'darth'});
  slugFor(GameOfForums.Category.create({slug: 'luke', parentCategory: parentCategory}),
          "darth/luke",
          "it uses the parent slug before the child");

  slugFor(GameOfForums.Category.create({id: 555, parentCategory: parentCategory}),
          "darth/555-category",
          "it uses the parent slug before the child and then uses id");

  parentCategory.set('slug', null);
  slugFor(GameOfForums.Category.create({id: 555, parentCategory: parentCategory}),
        "345-category/555-category",
        "it uses the parent before the child and uses ids for both");
});


test('findBySlug', function() {
  expect(6);

  var darth = GameOfForums.Category.create({id: 1, slug: 'darth'}),
    luke = GameOfForums.Category.create({id: 2, slug: 'luke', parentCategory: darth}),
    hurricane = GameOfForums.Category.create({id: 3, slug: '熱帶風暴畫眉'}),
    newsFeed = GameOfForums.Category.create({id: 4, slug: '뉴스피드', parentCategory: hurricane}),
    time = GameOfForums.Category.create({id: 5, slug: '时间', parentCategory: darth}),
    bah = GameOfForums.Category.create({id: 6, slug: 'bah', parentCategory: hurricane}),
    categoryList = [darth, luke, hurricane, newsFeed, time, bah];

  sandbox.stub(GameOfForums.Category, 'list').returns(categoryList);

  deepEqual(GameOfForums.Category.findBySlug('darth'), darth, 'we can find a category');
  deepEqual(GameOfForums.Category.findBySlug('luke', 'darth'), luke, 'we can find the other category with parent category');
  deepEqual(GameOfForums.Category.findBySlug('熱帶風暴畫眉'), hurricane, 'we can find a category with CJK slug');
  deepEqual(GameOfForums.Category.findBySlug('뉴스피드', '熱帶風暴畫眉'), newsFeed, 'we can find a category with CJK slug whose parent slug is also CJK');
  deepEqual(GameOfForums.Category.findBySlug('时间', 'darth'), time, 'we can find a category with CJK slug whose parent slug is english');
  deepEqual(GameOfForums.Category.findBySlug('bah', '熱帶風暴畫眉'), bah, 'we can find a category with english slug whose parent slug is CJK');
});

test('findSingleBySlug', function() {
  expect(6);

  var darth = GameOfForums.Category.create({id: 1, slug: 'darth'}),
    luke = GameOfForums.Category.create({id: 2, slug: 'luke', parentCategory: darth}),
    hurricane = GameOfForums.Category.create({id: 3, slug: '熱帶風暴畫眉'}),
    newsFeed = GameOfForums.Category.create({id: 4, slug: '뉴스피드', parentCategory: hurricane}),
    time = GameOfForums.Category.create({id: 5, slug: '时间', parentCategory: darth}),
    bah = GameOfForums.Category.create({id: 6, slug: 'bah', parentCategory: hurricane}),
    categoryList = [darth, luke, hurricane, newsFeed, time, bah];

  sandbox.stub(GameOfForums.Category, 'list').returns(categoryList);

  deepEqual(GameOfForums.Category.findSingleBySlug('darth'), darth, 'we can find a category');
  deepEqual(GameOfForums.Category.findSingleBySlug('darth/luke'), luke, 'we can find the other category with parent category');
  deepEqual(GameOfForums.Category.findSingleBySlug('熱帶風暴畫眉'), hurricane, 'we can find a category with CJK slug');
  deepEqual(GameOfForums.Category.findSingleBySlug('熱帶風暴畫眉/뉴스피드'), newsFeed, 'we can find a category with CJK slug whose parent slug is also CJK');
  deepEqual(GameOfForums.Category.findSingleBySlug('darth/时间'), time, 'we can find a category with CJK slug whose parent slug is english');
  deepEqual(GameOfForums.Category.findSingleBySlug('熱帶風暴畫眉/bah'), bah, 'we can find a category with english slug whose parent slug is CJK');
});

test('findByIds', function() {
  var categories =  {
    1: GameOfForums.Category.create({id: 1}),
    2: GameOfForums.Category.create({id: 2})
  };

  sandbox.stub(GameOfForums.Category, 'idMap').returns(categories);
  deepEqual(GameOfForums.Category.findByIds([1,2,3]), _.values(categories));
});

test('postCountStats', function() {
  var category1 = GameOfForums.Category.create({id: 1, slug: 'unloved', posts_year: 2, posts_month: 0, posts_week: 0, posts_day: 0}),
      category2 = GameOfForums.Category.create({id: 2, slug: 'hasbeen', posts_year: 50, posts_month: 4, posts_week: 0, posts_day: 0}),
      category3 = GameOfForums.Category.create({id: 3, slug: 'solastweek', posts_year: 250, posts_month: 200, posts_week: 50, posts_day: 0}),
      category4 = GameOfForums.Category.create({id: 4, slug: 'hotstuff', posts_year: 500, posts_month: 280, posts_week: 100, posts_day: 22}),
      category5 = GameOfForums.Category.create({id: 6, slug: 'empty', posts_year: 0, posts_month: 0, posts_week: 0, posts_day: 0});

  var result = category1.get('postCountStats');
  equal(result.length, 1, "should only show year");
  equal(result[0].value, 2);
  equal(result[0].unit, 'year');

  result = category2.get('postCountStats');
  equal(result.length, 2, "should show month and year");
  equal(result[0].value, 4);
  equal(result[0].unit, 'month');
  equal(result[1].value, 50);
  equal(result[1].unit, 'year');

  result = category3.get('postCountStats');
  equal(result.length, 2, "should show week and month");
  equal(result[0].value, 50);
  equal(result[0].unit, 'week');
  equal(result[1].value, 200);
  equal(result[1].unit, 'month');

  result = category4.get('postCountStats');
  equal(result.length, 2, "should show day and week");
  equal(result[0].value, 22);
  equal(result[0].unit, 'day');
  equal(result[1].value, 100);
  equal(result[1].unit, 'week');

  result = category5.get('postCountStats');
  equal(result.length, 0, "should show nothing");
});
