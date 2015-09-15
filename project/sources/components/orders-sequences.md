	<div class = "orders-sequences">
		<div class="one-column">

			<div class = "section-group">
				<div class="row np">
					<h4 class="new-section-heading dark-blue">Frequency and duration</h4>
				</div>
				<hr class="title-ruler bg-dark-blue">

				<div class="date">
					<label class="">EFFECTIVE DATE</label>
					<div class="ui-input-text date-input-wrapper">
						<input type="number" maxlength="2" placeholder="MM" data-wrapper-class="date-month">
						<input type="number" maxlength="2" placeholder="DD" data-wrapper-class="date-day">
						<input type="number" maxlength="4" placeholder="YYYY" data-wrapper-class="date-year">
					</div>
				</div>
				<div class="form-group no-border np">
					<div class="number large">
						<p>1</p>
					</div>
					<div class="schedule">
						<div class="input-box">
							<label>Frequency</label>
							<div class="row">
								<input type="number" data-wrapper-class="inline number-rating">
								<span>days/week</span>
							</div>
							<div class="days">
								<!-- Link to the days-in-a-week select lightbox -->
								<a href="#dayWeekSelector" data-rel="popup">M, W, F</a>
							</div>
						</div>
						<div class="input-box">
							<label>Duration</label>
							<div class="row">
								<input type="number" data-wrapper-class="inline number-rating">
								<span>weeks</span>
							</div>
						</div>
						<div class="input-box">
							<label>Frequency</label>
							<div class="row">
								<input type="number" data-wrapper-class="inline number-rating">
								<span>/days</span>
							</div>
						</div>
					</div>
					<div class="remove-btn">
						<i class="nc-icon-glyph ui-1_circle-remove"></i>
					</div>
				</div>
				<div class="form-group no-border np">
					<div class="number large">
						<p>2</p>
					</div>
					<div class="schedule">
						<div class="input-box">
							<label>Frequency</label>
							<div class="row">
								<input type="number" data-wrapper-class="inline number-rating">
								<span>days/week</span>
							</div>
							<div class="days">
								<!-- Link to the days-in-a-week select lightbox -->
								<a href="#dayWeekSelector" data-rel="popup">T, Th, <i class="nc-icon-glyph ui-1_lock"></i></a>
							</div>
						</div>
						<div class="input-box">
							<label>Duration</label>
							<div class="row">
								<input type="number" data-wrapper-class="inline number-rating">
								<span>weeks</span>
							</div>
						</div>
						<div class="input-box">
							<label>Frequency</label>
							<div class="row">
								<input type="number" data-wrapper-class="inline number-rating">
								<span>/days</span>
							</div>
						</div>
					</div>
					<div class="remove-btn">
						<i class="nc-icon-glyph ui-1_circle-remove"></i>
					</div>
				</div>
				<div class="form-group no-border np">
					<div class="number large">
						<p>3</p>
					</div>
					<div class="schedule">
						<div class="input-box">
							<label>Frequency</label>
							<div class="row">
								<input type="number" data-wrapper-class="inline number-rating">
								<span>days/week</span>
							</div>
							<div class="days">
								<!-- Link to the days-in-a-week select lightbox -->
								<a href="#dayWeekSelector" data-rel="popup">Specify days</a>
							</div>
						</div>
						<div class="input-box">
							<label>Duration</label>
							<div class="row">
								<input type="number" data-wrapper-class="inline number-rating">
								<span>weeks</span>
							</div>
						</div>
						<div class="input-box">
							<label>Frequency</label>
							<div class="row">
								<input type="number" data-wrapper-class="inline number-rating">
								<span>/days</span>
							</div>
						</div>
					</div>
					<div class="remove-btn">
						<i class="nc-icon-glyph ui-1_circle-remove"></i>
					</div>
				</div>
				<div class="add-seq">
					<input type="button" value="Add Sequence" data-wrapper-class="btn-lg btn-scnd">
				</div>
			</div>
		</div>
	</div>

	<!-- START Lightbox code for the Day of the Week Selector -->
	<!-- Javascript (or other) needes to be added to make this lightbox refresh the check-box data and function as specified here: 'Whatever the selections are for days-in-a-week in the page, when user clicks on the link, those days needs to be 'checked' in the lightbox by default when it opens' -->

	<div class="custom-lightbox-transprent ui-popup-screen ui-overlay-b ui-screen-hidden"></div>
    <div class="ui-popup-container ui-popup-hidden ui-popup-truncate popup-lightbox-daySelector" id="dayWeekSelector-popup">
        <div data-role="popup" id="dayWeekSelector" class="ui-popup ui-body-inherit popup-lightbox-content" data-dismissible="false" data-enhanced="true" data-overlay-theme="b">
        	<div>
        		<div class="chkbox-fixed-width">
	        		<label class="chkbox-heading">S</label>
	        		<input type="checkbox" name="checkbox-group" id="chkbox-sunday" data-wrapper-class="no-border custom-chkbox" />
	        		<label for="chkbox-sunday"></label>
        		</div>
        		<div class="chkbox-fixed-width">
	        		<label class="chkbox-heading">M</label>
	        		<input type="checkbox" name="checkbox-group" id="chkbox-monday" data-wrapper-class="no-border custom-chkbox" checked="checked" />
	        		<label for="chkbox-monday"></label>
        		</div>
        		<div class="chkbox-fixed-width">
	        		<label class="chkbox-heading">T</label>
	        		<input type="checkbox" name="checkbox-group" id="chkbox-tuesday" data-wrapper-class="no-border custom-chkbox" />
	        		<label for="chkbox-tuesday"></label>
        		</div>
        		<div class="chkbox-fixed-width">
	        		<label class="chkbox-heading">W</label>
	        		<input type="checkbox" name="checkbox-group" id="chkbox-wednesday" data-wrapper-class="no-border custom-chkbox" checked="checked" />
	        		<label for="chkbox-wednesday"></label>
        		</div>
        		<div class="chkbox-fixed-width">
	        		<label class="chkbox-heading">Th</label>
	        		<input type="checkbox" name="checkbox-group" id="chkbox-thursday" data-wrapper-class="no-border custom-chkbox" />
	        		<label for="chkbox-thursday"></label>
        		</div>
        		<div class="chkbox-fixed-width">
	        		<label class="chkbox-heading">F</label>
	        		<input type="checkbox" name="checkbox-group" id="chkbox-friday" data-wrapper-class="no-border custom-chkbox" checked="checked" />
	        		<label for="chkbox-friday"></label>
        		</div>
        		<div class="chkbox-fixed-width">
	        		<label class="chkbox-heading">S</label>
	        		<input type="checkbox" name="checkbox-group" id="chkbox-saturday" data-wrapper-class="no-border custom-chkbox" />
	        		<label for="chkbox-saturday"></label>
        		</div>
        		<div class="chkbox-fixed-width no-margin-right">
	        		<label class="chkbox-heading header-icon nc-icon-glyph ui-1_lock"></label>
	        		<input type="checkbox" name="checkbox-group" id="chkbox-lock" data-wrapper-class="no-border custom-chkbox" />
	        		<label for="chkbox-lock"></label>
        		</div>
        	</div>
			<div class="popup-lightbox-button right">
			<a href="#" data-rel="back"><input type="button" value="UPDATE" data-wrapper-class="btn-custom btn-scnd" /></a>
			</div>
			<div class="cf"></div>
        </div>
    </div>
