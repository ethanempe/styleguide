	<div class="supplies bg-silver-light">
		<div data-role="header" class="sticky-header">
	        <h1>Documentation</h1>
	        <input type="button" value="Save and Close" data-wrapper-class="right no-margin btn-cfrm btn-sm">
	    </div>

		<div class="space-sm bg-azule-dark flex around">
			<p class="invert">Phillip McCoy</p>
		</div>

		<ul class="ui-nav-2 flex fill-even">
	        <li>
	            <a href="#">
	                <span class="icon icon-access"></span>
	                Access
	            </a>
	            <div class="indicator"><div class="icon-chevron"></div></div>
	        </li>
	        <li>
	            <a href="#">
	                <span class="icon icon-tests"></span>
					Tests
	            </a>
	            <div class="indicator"><div class="icon-chevron"></div></div>
	        </li>
	        <li>
	            <a href="#">
	                <span class="icon icon-goals"></span>
	                Goals
	            </a>
	            <div class="indicator"><div class="icon-chevron"></div></div>
	        </li>
	        <li>
	            <a href="#">
	                <span class="icon icon-medications"></span>
	                Medications
	            </a>
	            <div class="indicator"><div class="icon-chevron"></div></div>
	        </li>
	        <li class="active">
	            <a href="#">
	                <span class="icon icon-supplies"></span>
	                Supplies
	            </a>
	            <div class="indicator"><div class="icon-chevron"></div></div>
	        </li>
	        <li>
	            <a href="#">
	                <span class="icon icon-plan"></span>
	                Plan
	            </a>
	            <div class="indicator"><div class="icon-chevron"></div></div>
	        </li>
	    </ul>


		<div class="pad-top bg-silver-light">
			<div class="ui-listbox-container pad-u">
				<div class="space-lg flex underline-sec-head">
					<h3 class="fx-end">Supply use</h3>
					<a href="#suppliesTrunkLightbox" data-rel="popup">
						<input type="button" value="Add supply" data-wrapper-class="btn btn-prim">
					</a>
				</div>
				<div class="content">
					<div class="ui-listbox pad-u">
						<div class="space-lg flex">
							<h2 class="card-heading left">Aquaflo Hydrogel Wound Dressings by Covidien</h2>
							<a class="view right nc-icon-glyph arrows-3_square-corner-up-right">View</a>
						</div>
						<div class="flex">
							<div>
								<div class="amount group left">
									<label for="">Use Amount</label>
									<div class="flex left">
										<input type="text" placeholder="Amount" data-wrapper-class="bordered inline half">
										<p class="inline no-margin">Rolls</p>
									</div>
								</div>
								<div class="source group left">
									<label for="">Source</label>
									<p>McKessen Order</p>
								</div>
							</div>
							<div class="fx-end fx-fixed">
								<input type="button" value="Request" data-wrapper-class="btn-lg btn-scnd">
							</div>
						</div>
					</div>
					<div class="ui-listbox pad-u">
						<div class="space-lg flex">
							<h2 class="card-heading left">Ultra-Fine Needle Insulin Syringes by Becton Dickinson</h2>
							<a class="view right nc-icon-glyph arrows-3_square-corner-up-right">View</a>
						</div>
						<div class="flex">
							<div>
								<div class="amount group left">
									<label for="">Use Amount</label>
									<div class="flex left">
										<input type="text" placeholder="Amount" data-wrapper-class="bordered inline half">
										<p class="inline no-margin">Boxes</p>
									</div>
								</div>
								<div class="source group left">
									<label for="">Source</label>
									<p>McKessen Order</p>
								</div>
							</div>
							<div class="fx-end fx-fixed">
								<input type="button" value="Request" data-wrapper-class="btn-lg btn-scnd">
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div> <!-- END TRUNK SUPPLIES -->

	<!-- START light box code -->
	<div class="custom-lightbox ui-popup-screen ui-overlay-b ui-screen-hidden"></div>
	<div class="ui-popup-container ui-popup-hidden ui-popup-truncate popup-lightbox-fullsize supplies-lightbox" id="suppliesTrunkLightbox-popup">
		<div data-role="popup" id="suppliesTrunkLightbox" class="ui-popup ui-body-inherit popup-lightbox-content" data-dismissible="false" data-enhanced="true" data-overlay-theme="b">
			<!-- Lightbox content goes here -->
			<div class="section-group">
				<div class="row np">
					<div class="left">
						<span class="new-section-heading lightbox-heading">Trunk supplies</span>
					</div>
					<a href="#" data-rel="back"><i class="right nc-icon-glyph ui-1_simple-remove"></i></a>
				</div>
				<hr class="lightbox-ruler lightbox-title-ruler">
				<div class="pad-bot">
					<input type="text" placeholder="Search for supplies" data-wrapper-class="search-input nc-icon-outline ui-1_zoom no-shadow">
				</div>
				<div class="ui-listbox-container pad-top">
					<div class="ui-listbox pad-u no-shadow">
						<div class="space-lg flex">
							<h2 class="card-heading left">Needle Option 3</h2>
						</div>
						<div class="flex">
							<div class="pad-right">
								<p class="dark"><strong>Dressing, Aquaflo, Hydrogel, 3”</strong></p>
								<p class="dark sm">HCPCS Code: A6242</p>
								<p class="dark sm">Manufacturer / supplier #: 8884476139</p>
							</div>
							<div class="fx-end fx-fixed">
								<input type="button" value="Add" data-wrapper-class="btn-lg btn-scnd">
							</div>
						</div>
					</div>
					<div class="ui-listbox pad-u no-shadow">
						<div class="space-lg flex">
							<h2 class="card-heading left">Ultra-Fine Needle Insulin Syringes by Becton Dickinson</h2>
						</div>
						<div class="flex">
							<div class="pad-right">
								<p class="dark"><strong>Syringe, Ultra-Fine II, 3/10cc, 31g, 5/16”</strong></p>
								<p class="dark sm">HCPCS Code: A6242</p>
								<p class="dark sm">Manufacturer / supplier #: 8884476139</p>
							</div>
							<div class="fx-end fx-fixed">
								<input type="button" value="Add" data-wrapper-class="btn-lg btn-scnd">
							</div>
						</div>
					</div>
					<div class="ui-listbox pad-u no-shadow">
						<div class="space-lg flex">
							<h2 class="card-heading left">100% Silicone ERASE CAUTI Foley Catheter Kits</h2>
						</div>
						<div class="flex">
							<div class="pad-right">
								<p class="dark"><strong>Tray, Foley, Erase Cauti, 100% Sili, 14FR10ml catheter kit silicone and syringe</strong></p>
								<p class="dark sm">HCPCS Code: A6242</p>
								<p class="dark sm">Manufacturer / supplier #: 8884476139</p>
							</div>
							<div class="fx-end fx-fixed">
								<input type="button" value="Add" data-wrapper-class="btn-lg btn-scnd">
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
