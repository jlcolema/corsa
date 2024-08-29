    function PLPOptimizationTest() {
        var waitForElements = setInterval(() => {
        const pageContainer = document.querySelector('.collection-template-section'); 
        if (typeof (ranPLPOptimizationTest) === 'undefined' && pageContainer) {
            window.ranPLPOptimizationTest = true;
            clearInterval(waitForElements);
            document.body.classList.add('9'); 
            PLPOptimizationUPDATE(); 
        }
        }, 100);
    }
    function PLPOptimizationUPDATE() {
        
        // Add helper classes
        $('.collection-template-section > .container > div').addClass('new-container');
        $('.twelve.columns.list-collection-wrapper.medium-down--one-whole.new-container, .twelve.columns.medium-down--one-whole.new-container').wrap('<div class="parent-container"></div>');
        var parentDiv = $('.list-collections.clearfix.equal-columns--clear.equal-columns--outside-trim');
        if (parentDiv.length > 0) {
        var elementsToUpdate = parentDiv.find('.one-third');
        elementsToUpdate.removeClass('one-third').addClass('one-fifth');
        }

        // New filter section
        var productSingleMeta = $('.twelve.columns.list-collection-wrapper.medium-down--one-whole .collection__description');
        var stickyCartItem = $('<div id="filter-section"><div class="left-col"><div class="filter-button"><span><img src="https://storage.googleapis.com/images.trinity.one/Corsa%20Performance/CP-A-PLPOptimization-Oct2023/Group%204.png"></span>Filters</div><div class="selected-filter"></div><div class="clear-all">Clear all</div></div><div class="col-right"><span class="short-title">Sort by:</span></div></div>');
        if (productSingleMeta.length > 0) {
        productSingleMeta.after(stickyCartItem);
        }else {
        $('.parent-container .twelve.columns.medium-down--one-whole.new-container').prepend(stickyCartItem);
        }
        
        // Create popup for filter
        var popupFilter =`
            <div class="popup-filter-container">
                <div class="container">
                    <div class="all-new-filter-block">
                        <div class="filter-title"><span class="filter-text">Filter</span><span class="close">×</span></div>
                    </div>
                </div>
            </div>`;
        $('.clearfix.breadcrumb-collection').after(popupFilter).html();
            

        // Create and append new filter checkbox list
        function createFilterLists(mainFilterSelector, destinationFilterSelector) {
            var uniqueValues = {};
            $(mainFilterSelector).each(function () {
                var sourceDiv = $(this);
                if (sourceDiv.find(':checkbox').length > 0) {
                    var checkboxes = sourceDiv.find(':checkbox');
                    var toggleContent = sourceDiv.find('h4.toggle').text();
                    var newFilterBlock = $('<div class="new-filter-block"></div>');
                    newFilterBlock.append($(this).find('h4').clone());
                    var labelsContainer = $('<div class="all-labels-container"></div>');

                    checkboxes.each(function () {
                        var value = $(this).val();
                        if (!uniqueValues[value]) {
                            uniqueValues[value] = true;
                            var checkbox = $('<input type="checkbox">').attr({
                                'value': value,
                                'name': $(this).attr('name'),
                            });
                            $.each(this.attributes, function () {
                                if (this.specified && this.name !== 'value' && this.name !== 'name') {
                                    checkbox.attr(this.name, this.value);
                                }
                            });
                            var labelText = $(this).parent().text().trim();
                            var label = $('<label>').attr('data-option-filter-new', '');
                            label.append(checkbox).append(labelText);
                            labelsContainer.append(label);
                        } else {
                            labelsContainer.find(':checkbox[value="' + value + '"]').attr('checked', true);
                        }
                    });
                    newFilterBlock.append(labelsContainer);
                    $(destinationFilterSelector).append(newFilterBlock);
                    labelsContainer.css('display', 'none');
                }
            });
        }
        createFilterLists('.sidebar-wrap .sidebar-block', '.all-new-filter-block');
        // Add 'checked' attribute
        $(document).on('click', '.new-filter-block input[type="checkbox"]', function () {
            if ($(this).prop('checked')) {
                $(this).attr('checked', true);           
            } else {
                $(this).removeAttr('checked');
            }
        });


        // Add click handler for filtering
        $('.new-filter-block').on('change', 'input[type="checkbox"]', function () {
            var value = $(this).val();
            var matchedCheckboxes = $('.sidebar__collection-filter input[type="checkbox"]').filter(function () {
                return $(this).val() === value;
            });
            if (matchedCheckboxes.length > 1) {
                var checkedCheckbox = matchedCheckboxes.filter('[checked]');
                if (checkedCheckbox.length > 0) {
                    $(checkedCheckbox).click();
                } else {
                    $(checkedCheckbox).click();
                }
            } else {
                $(matchedCheckboxes).click();
                var checkboxes = $('.sidebar__collection-filter input[type="checkbox"]:checked');
                checkboxes.each(function () {
                    var value = $(this).val();
                    if ($('.selected-filter input[value="' + value + '"]').length === 0) {
                        var labelText = $(this).parent('label').text();
                        var newCheckbox = $('<input type="checkbox" name="' + $(this).attr('name') + '" value="' + value + '">');
                        var newLabel = $('<label>').text(labelText);
                        var newAnchor = $('<a>').append(newCheckbox).append(newLabel);
                        $('.selected-filter').append(newAnchor);
                    }
                });
                
            }
        });
        
        // Click for checkbox unchecking
        $('.new-filter-block').on('change', 'input[type="checkbox"]:not(:checked)', function () {
            var value = $(this).val();
            $('.selected-filter a').filter(function () {
                return $(this).find('input[type="checkbox"]').val() === value;
            }).remove();
        });
        

        // Apply filter button
        var applyFilterButton = $('<button>', {  text: 'Apply', id: 'applyFilterBtn', });
        $('.all-new-filter-block').append(applyFilterButton);


        // Click handler for .selected-filter buttons
        $('.selected-filter').on('click', 'a', function() {
            var checkboxValue = $(this).find('input[type="checkbox"]').val();
            $(this).remove();
            var matchingCheckbox1 = $('.filter-active-tag.color-filter--false input[type="checkbox"][value="' + checkboxValue + '"]');
            matchingCheckbox1.prop('checked', false).change();
            $(matchingCheckbox1).removeAttr('checked');   
            var matchingCheckbox2 = $('.all-labels-container input[type="checkbox"][value="' + checkboxValue + '"]');
            matchingCheckbox2.prop('checked', false).change();
            $(matchingCheckbox2).removeAttr('checked');   
        });


        // Monitor changes in '.selected-filter'
        checkSelectedFilter();
        $(document).on('DOMSubtreeModified', '.selected-filter', function () {
            checkSelectedFilter();
        });
        function checkSelectedFilter() {
            var selectedFilterContent = $('.selected-filter').html();
            if (selectedFilterContent.trim() === "") {
                $('.clear-all').css('display', 'none');
            } else {
                $('.clear-all').css('display', 'block');
            }
        }


        // Create the short by from default filter
        var existingSelect = $('#sort-by');
        var newSelect = $('<select>').addClass('sort_by').attr('id', 'new-sort-by');
        existingSelect.find('option').each(function() {
        var optionText = $(this).text();
        var optionValue = $(this).val();
        var newOption = $('<option>').text(optionText).val(optionValue);
        newSelect.append(newOption);
        });
    
        $('.col-right').append(newSelect);
        var clonedSelect = newSelect.clone().attr('id', 'cloned-sort-by').css('display', 'none');
        var newFilterBlock = $('<div>').addClass('new-filter-block');
        var toggleTitle = $('<h4>').addClass('toggle').text('Sort by').append('<span class="right icon-down-arrow"></span>');
    
        newFilterBlock.append(toggleTitle);
        newFilterBlock.append(clonedSelect);
        $('.filter-title').after(newFilterBlock);
        $('#new-sort-by').on('change', function() {
        var selectedValue = $(this).val();
        existingSelect.val(selectedValue).trigger('change');
        });
        clonedSelect.on('change', function() {
        var selectedValue = $(this).val();
        existingSelect.val(selectedValue).trigger('change');
        });

        // short filter function
        $("select.sort_by").each(function () {
            var $this = $(this),
            numberOfOptions = $(this).children("option").length;
            $this.addClass("select-hidden");
            $this.wrap('<div class="select"></div>');
            $this.after('<div class="select-styled"></div>');

            var $styledSelect = $this.next("div.select-styled");
            $styledSelect.text($this.children("option").eq(0).text());

            var $list = $("<ul />", {
            class: "select-options",
            }).insertAfter($styledSelect);

            for (var i = 0; i < numberOfOptions; i++) {
            $("<li />", {
                text: $this.children("option").eq(i).text(),
                rel: $this.children("option").eq(i).val(),
            }).appendTo($list);
            if ($this.children("option").eq(i).is(":selected")) {
                $('li[rel="' + $this.children("option").eq(i).val() + '"]').addClass(
                "is-selected"
                );
            }
            }

            var $listItems = $list.children("li");
            $styledSelect.click(function (e) {
            e.stopPropagation();
            $("div.select-styled.active")
                .not(this)
                .each(function () {
                $(this).removeClass("active").next("ul.select-options").hide();
                });
            $(this).toggleClass("active").next("ul.select-options").toggle();
            });
            $listItems.click(function (e) {
            e.stopPropagation();
            $styledSelect.text($(this).text()).removeClass("active");
            $this.val($(this).attr("rel"));
            $list.find("li.is-selected").removeClass("is-selected");
            $list
                .find('li[rel="' + $(this).attr("rel") + '"]')
                .addClass("is-selected");
            $list.hide();
            });
            $(document).click(function () {
            $styledSelect.removeClass("active");
            $list.hide();
            });
        });
        $(".select-options li").on("click", function () {
            var selectedValue = $(this).attr("rel");
            var selectElement = $("select.sort_by");
            selectElement.val(selectedValue);
            selectElement.trigger("change");
        });




        // Apply filter button and close filter
        $('.filter-button, .all-new-filter-block .close, .all-new-filter-block #applyFilterBtn').on('click', function () {
            $('.popup-filter-container').css('display', 'none');
        });
        $('.filter-button').on('click', function () {
            $('.popup-filter-container').css('display', 'block');
        });
        
        // toogle filter items
        $('.new-filter-block .toggle').click(function() {
            $(this).toggleClass('active');
            $(this).next('.all-labels-container, .select').toggle();
        });
    


        // Clear all filters functionality
        $('.clear-all').on('click', function () {
        $('.selected-filter').empty();
        $(this).css('display', 'none');
        // $('button.clear-active-filter').trigger('click');
        $('.new-filter-block  input[type="checkbox"]').prop('checked', false);
        $('.new-filter-block input[type="checkbox"]').removeAttr('checked');   

        $('.filter-active-tag').get().reverse().forEach(function(element) {
            var $clearButton = $(element).find('.clear-active-filter');
            $clearButton.click();
        });
        });

        
        
        //Others
        var hideCollectionP = $('.parent-container .collection__description .rte').find('p');
        if (hideCollectionP.length === 1) {
            hideCollectionP.addClass('hide');
        }
        

        
        
        
            
    }
    try {
        if (document.readyState === 'complete' || (document.readyState !== 'loading' && !document.documentElement.doScroll)) {
        PLPOptimizationTest();
        } else {
        document.addEventListener('DOMContentLoaded', PLPOptimizationTest);
        }
    } catch (err) {
        const e = {
        dev: 'U062HUTV57T', 
        vwotest: '9', 
        vwodesc: 'CP-A-PLPOptimization-Oct2023 | V2', 
        type: 'vwo',
        message: err.toString(),
        stack: err.stack,
        source: window.location.href
        };
        const x = new XMLHttpRequest();
        // x.open('POST', 'https://us-central1-tixray.cloudfunctions.net/err', !0), x.send(JSON.stringify(e));
    }
                    