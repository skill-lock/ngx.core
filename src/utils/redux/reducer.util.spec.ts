import { Dictionary } from "../collections/dictionary";
import { updateState, updateStateItem, updateMapState, updateAllMapState } from "./reducer.util";

export interface SimpleState {
	isBusy: boolean;
	items: Event[];
	differentItem: Event;
	topicName?: string;
}

export interface EventTableState extends Dictionary<EventTableItemState> {
}

export interface EventState extends Dictionary<Event> {
}

export interface EventTableItemState {
	isBusy: boolean;
	item: Event;
	count?: number;
}

export interface Event {
	id: number;
	name: string;
	categoryName?: string;
	score: number;
}

describe("ReducerUtilSpecs", () => {
	let simpleState: SimpleState;
	let eventTableState: EventTableState;
	let eventState: EventState;
	let eventStateResult: EventState;

	describe("updateState", () => {
		describe("given single property is being updated", () => {
			beforeEach(() => {
				simpleState = {
					isBusy: true,
					items: [],
					differentItem: { id: 1, name: "test", score: 0 }
				};
			});

			it("should update correctly", () => {
				const result = updateState(simpleState, { isBusy: false });
				expect(result.isBusy).toEqual(false);
			});

			it("should merge an extra property within the state", () => {
				const result = updateState(simpleState, { topicName: "hello" });
				expect(result.topicName).toEqual("hello");
			});
		});
	});

	describe("updateStateItem", () => {
		describe("given single property is being updated", () => {
			beforeEach(() => {
				simpleState = {
					isBusy: true,
					items: [],
					differentItem: { id: 1, name: "test", score: 0 }
				};
			});

			it("should update correctly", () => {
				const result = updateStateItem({
					state: simpleState,
					propertyName: "differentItem",
					item: simpleState.differentItem,
					changes: { name: "Hola" }
				});

				expect(result.differentItem.name).toEqual("Hola");
			});

			it("should merge an extra property within the state", () => {
				const result = updateStateItem({
					state: simpleState,
					propertyName: "differentItem",
					item: simpleState.differentItem,
					changes: { categoryName: "WhatsUp" }
				});
				expect(result.differentItem.categoryName).toEqual("WhatsUp");
			});
		});
	});

	describe("updateMapState", () => {
		describe("given a state within a substate is being updated", () => {
			beforeEach(() => {
				eventTableState = {
					"123": {
						isBusy: true,
						item: {
							id: 2,
							name: "Juve vs Milan",
							score: 1
						}
					},
					"456": {
						isBusy: true,
						item: {
							id: 6,
							name: "Italy vs England",
							score: 2
						}
					}
				};
			});

			it("should be correctly immutable", () => {
				const key = 456;
				const result = updateMapState<EventTableState, EventTableItemState>(key, eventTableState, { isBusy: false });
				expect(eventTableState).not.toEqual(result);
				expect(eventTableState[key]).not.toEqual(result[key]);
			});

			it("should update a specific entity by key", () => {
				const key = 456;
				const result = updateMapState<EventTableState, EventTableItemState>(key, eventTableState, {
					isBusy: false,
					count: 1
				});
				expect(result[key].isBusy).toEqual(false);
			});

			it("should add a new entity", () => {
				const key = 112;
				const result = updateMapState<EventTableState, EventTableItemState>(key, eventTableState, {
					isBusy: true,
					item: {
						id: 42,
						name: "PSG vs Marseille",
						score: 2
					}
				});
				expect(result[key]).toBeDefined();
				expect(result[key].item.name).toEqual("PSG vs Marseille");
			});
		});
	});

	describe("updateAllMapState", () => {
		describe("given a list of entities to be added or updated", () => {
			beforeEach(() => {
				eventState = {
					"2": {
						id: 2,
						name: "Juve vs Milan",
						score: 1
					},
					"6": {
						id: 6,
						name: "Italy vs England",
						score: 2
					}
				};

				const changes: Partial<Event>[] = [
					{
						id: 2,
						name: "PSG vs Marseille"
					},
					{
						id: 5,
						name: "Brazil vs France",
						score: 4
					},
					null
				];

				eventStateResult = updateAllMapState(eventState, changes);
			});

			it("should add a new entity within the state", () => {
				const key = 5;
				expect(eventStateResult[key]).toBeDefined();
				expect(eventStateResult[key].name).toEqual("Brazil vs France");
			});

			describe("when modifying existing entity", () => {

				it("should update and not replace", () => {
					const key = 2;
					expect(eventStateResult[key].score).toEqual(1);
				});

				it("should modify an existing entity", () => {
					const key = 2;
					expect(eventStateResult[key].name).toEqual("PSG vs Marseille");
				});

			});

			it("should be correctly immutable", () => {
				const key = 2;
				expect(eventState).not.toEqual(eventStateResult);
				expect(eventState[key]).not.toEqual(eventStateResult[key]);
			});

		});
	});
});