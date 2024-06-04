import El from "./element-builder.js";

const asyncSleep = async (ms = 100) => {
    return new Promise(r => setTimeout(r, ms));
};

export class SortedFilterPills {
    constructor(opts = {}) {
        this.instance = null;
        this.wrapper = null;
        this.pillContainer = null;
        this.available = {};
        this.selected = ["All"];
        this.total = 0;
        this.filterMemo = "";

        this.filter = opts.filter;
        this.ordering = opts.ordering ?? null;
        this.alwaysShow = opts.alwaysShow ?? false;
        this.selectMultiple = opts.selectMultiple ?? false;
        this.sortType = opts.sortType ?? "alpha";
        this.runInitialFilters = opts.runInitialFilters ?? false;

        if (!this.filter?.length) {
            console.error(`[Pagefind FilterPills component]: No filter option supplied, nothing to display`);
            return;
        }

        if (opts.containerElement) {
            this.initContainer(opts.containerElement);
        } else {
            console.error(`[Pagefind FilterPills component]: No selector supplied for containerElement`);
            return;
        }
    }

    initContainer(selector) {
        const container = document.querySelector(selector);
        if (!container) {
            console.error(`[Pagefind FilterPills component]: No container found for ${selector} selector`);
            return;
        }
        container.innerHTML = "";
        const id = `pagefind_modular_filter_pills_${this.filter}`;


        const wrapper = new El("div")
            .class("pagefind-modular-filter-pills-wrapper")
            .attrs({
                "role": "group",
                "aria-labelledby": id,
            });
        if (!this.alwaysShow) {
            wrapper.attrs({"data-pfmod-hidden": true});
        }
        
        new El("div")
            .id(id)
            .class("pagefind-modular-filter-pills-label")
            .attrs({
                "data-pfmod-sr-hidden": true
            })
            .text(`Filter results by ${this.filter}`)
            .addTo(wrapper);

        this.pillContainer = new El("div")
            .class("pagefind-modular-filter-pills")
            .addTo(wrapper);

        this.wrapper = wrapper.addTo(container);
    }

    update() {
        const filterMemo = this.available.map(a => a[0]).join("~");
        if (filterMemo == this.filterMemo) {
            this.updateExisting();
        } else {
            this.renderNew();
            this.filterMemo = filterMemo;
        }
    }

    pushFilters() {
        // const selected = this.selected.filter(v => v !== "All");
        // this.instance.triggerFilter(this.filter, selected);
        // console.log(this.instance); // this.instance.searchFilters looks like: searchFilters: { "repository": ["Houghton Library, Cambridge MA US"]}

        // this.instance.triggerSearchWithFilters(null, { [this.filter]: selected });
        // this.instance.triggerSearchWithFilters("a", { [this.filter]: selected });

        const selected = this.selected.filter(v => v !== "All");
        const filters = { [this.filter]: selected };
        const searchTerm = this.instance.searchTerm || null;
        console.log("searchTerm", searchTerm);
        console.log(this.instance);

        (async () => {
            await this.instance.__load__(); // Ensure __pagefind__ is initialized

            // Access the __pagefind__ object
            const pf = this.instance.__pagefind__;

            if (pf) {
                const results = await pf.search(searchTerm, { filters });
                // this.instance.__dispatch__("search", null, filters);
                // this.instance.__dispatch__("results", results);
                this.instance.searchTerm = searchTerm;
                this.instance.searchFilters = filters;
                this.instance.__dispatch__("search", searchTerm, filters);
                // this.instance.__search__(null, filters);
                this.instance.__dispatch__("results", results);
                console.log("instance", this.instance);
            } else {
                console.error("No __pagefind__ object found on instance");
            }
        })();
    }

    pillInner(val, count) {
        if (this.total) {
            return `<span aria-label="${val}">${val} (${count})</span>`;
        } else {
            return `<span aria-label="${val}">${val}</span>`;
        }
    }

    renderNew() {
        this.pillContainer.innerHTML = "";
        this.available.forEach(([val, count]) => {
            new El("button")
                .class("pagefind-modular-filter-pill")
                .html(this.pillInner(val, count))
                .attrs({
                    "aria-pressed": this.selected.includes(val),
                    "type": "button",
                })
                .handle("click", () => {
                    console.log("clicked", val, this.selected);
                    if (val === "All") {
                        this.selected = ["All"];
                    } else if (this.selected.includes(val)) {
                        this.selected = this.selected.filter(v => v !== val);
                    } else if (this.selectMultiple) {
                        this.selected.push(val);
                    } else {
                        this.selected = [val];
                    }
                    if (!this.selected?.length) {
                        this.selected = ["All"];
                    } else if (this.selected?.length > 1) {
                        this.selected = this.selected.filter(v => v !== "All");
                    }
                    console.log(this.selected);
                    this.update();
                    this.pushFilters();
                    console.log("pushed filters", this.selected);
                    console.log(this);
                })
                .addTo(this.pillContainer);
        });
    }

    updateExisting() {
        const pills = [...this.pillContainer.childNodes];
        this.available.forEach(([val, count], i) => {
            pills[i].innerHTML = this.pillInner(val, count);
            pills[i].setAttribute("aria-pressed", this.selected.includes(val));
        });
    }

    register(instance) {
        this.instance = instance;
        this.instance.on("filters", (filters) => {
            if (!this.pillContainer) return;

            if (this.selectMultiple) {
                filters = filters.available;
            } else {
                filters = filters.total;
            }

            let newlyAvailable = filters[this.filter];
            if (!newlyAvailable) {
                console.warn(`[Pagefind FilterPills component]: No possible values found for the ${this.filter} filter`);
                return;
            }
            this.available = Object.entries(newlyAvailable);

            if (this.sortType === "alpha"){
                if (Array.isArray(this.ordering)) {
                    this.available.sort((a, b) => {
                        const apos = this.ordering.indexOf(a[0]);
                        const bpos = this.ordering.indexOf(b[0]);
                        return (apos === -1 ? Infinity : apos) - (bpos === -1 ? Infinity : bpos);
                    });
                } else {
                    this.available.sort((a, b) => {
                        return a[0].localeCompare(b[0]);
                    });
                }
            } else if (this.sortType === "count") {
                this.available.sort((a, b) => b[1] - a[1]);
            } else if (this.sortType === "int"){
                this.available.sort((a, b) => {
                    const aInt = parseInt(a[0], 10);
                    const bInt = parseInt(b[0], 10);
                    if (isNaN(aInt) && isNaN(bInt)) return 0;
                    if (isNaN(aInt)) return 1;
                    if (isNaN(bInt)) return -1;
                    return aInt - bInt;
                });
            }

            this.available.unshift(["All", this.total]);
            this.update();
        });

        instance.on("results", (results) => {
            if (!this.pillContainer) return;
            this.total = results?.unfilteredResultCount || results.results.length || 0;

            if (this.available?.[0]?.[0] === "All") {
                this.available[0][1] = this.total;
            }

            // if (this.total || this.alwaysShow) {
            //     this.wrapper.removeAttribute("data-pfmod-hidden");
            // } else {
            //     this.wrapper.setAttribute("data-pfmod-hidden", "true");
            // }
            this.update();
        });

        if (this.runInitialFilters) {
            (async () => {
                await this.instance.__load__(); // Ensure __pagefind__ is initialized

                // Access the __pagefind__ object
                const pf = this.instance.__pagefind__;

                // Trigger the filters manually on the initial pageload
                if (pf) {
                    const filters = await pf.filters();
                    let newlyAvailable = filters[this.filter];

                    if (!newlyAvailable) {
                        console.warn(`[Pagefind FilterPills component]: No possible values found for the ${this.filter} filter`);
                        return;
                    }
                    this.available = Object.entries(newlyAvailable);

                    // Sort the available filters based on sortType
                    if (this.sortType === "count") {
                        this.available.sort((a, b) => b[1] - a[1]);
                    } else if (this.sortType === "int") {
                        this.available.sort((a, b) => {
                            const aInt = parseInt(a[0], 10);
                            const bInt = parseInt(b[0], 10);
                            if (isNaN(aInt) && isNaN(bInt)) return 0;
                            if (isNaN(aInt)) return 1;
                            if (isNaN(bInt)) return -1;
                            return aInt - bInt;
                        });
                    } else {
                        this.available.sort((a, b) => a[0].localeCompare(b[0]));
                    }

                    this.available.unshift(["All", this.total]);

                    // this.renderNew();
                    this.update();

                    const results = await pf.search(null, {});
                    this.instance.__dispatch__("results", results);

                } else {
                    console.error("No __pagefind__ object found on instance");
                }
            })().then(()=> {
                this.wrapper.removeAttribute("data-pfmod-hidden");
            });
        }
    }
}