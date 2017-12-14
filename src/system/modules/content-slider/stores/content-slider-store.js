import Bacon from 'baconjs';
import R from 'ramda';
import Actions from '../../../../actions/actions';
import publish from '../../../stores/state-store';
import { toTimeline } from '../../../stores/animation-store';

// an evil magic number
// TODO - allow for dynamic item width. This task value is low with relatively severe complexity, do only when required.
const listItemWidth = 400

// filter functions.
const toContentSlider = (state) => state.component === "ContentSlider";
const toSliderWithContent = (state) => state.items !== undefined && state.items.length > 0;
const toAllSliders = (prev, next) => ({ ...prev, [next.id]: next  }) 
const toButtonById = R.curry((key, state) => state.moveKey === key);

// cars 
const toNumberOfItemsOnScreen = () => Math.floor(Math.min(1200, window.document.body.clientWidth) / listItemWidth);

// get the max number of index positions based on the list length, item size, and screen size. 
const getUpperBounds = (slider) => Math.ceil(slider.items.length / toNumberOfItemsOnScreen())

// screen size dictates maximum number of pages, zero is the obvious minimum.
const keepWithinBounds = (value, slider) => value > 0 
							? value > (getUpperBounds(slider) - 1) ? (getUpperBounds(slider) - 1) : value
							: 0;
// calculate the next index position based on previous position and the update event.
const getNextX = (prev, sliders, update) => prev[update.rootId] !== undefined 
					? keepWithinBounds((prev[update.rootId].x + update.moveKey), sliders[update.rootId])
					: keepWithinBounds((0 + update.moveKey), sliders[update.rootId]);

const toAdjustment = () => (toNumberOfItemsOnScreen() * 400)

// update slider data.
const updatePosition = (prev, sliders, update) => ({ 
										...prev,
										lastUpdatedId: update.rootId, 
										[update.rootId]:{ 
											x: getNextX(prev, sliders, update), 
											slider: sliders[update.rootId],
											adjustment: toAdjustment(),
											prevX: prev[update.rootId] ? prev[update.rootId].x : 0 
										} 
									});

// take property using the lastUpdateId key.
const toNextPositionUpdate = (state) => state[state.lastUpdatedId];

// get content for sliders when data is injected.
const contentSliderActions = Actions.filter(toContentSlider).filter(toSliderWithContent);

// move forward and backward buttons
const moveBackButtonAction = Actions.filter(toButtonById(-1));
const moveNextButtonAction = Actions.filter(toButtonById(1));

// data for all sliders.
const allSliders = contentSliderActions.scan({}, toAllSliders);

// calculate positions for the appropriate slider, always returns a collection of all sliders
const positionUpdates = Bacon.update({}, [allSliders.toProperty(), moveNextButtonAction], updatePosition,
					   				     [allSliders.toProperty(), moveBackButtonAction], updatePosition).skip(1)

// extract the slider relevant to the update event and its position details.
const nextPostionUpdate = positionUpdates.map(toNextPositionUpdate);

module.exports = {
	nextPostionUpdate
}