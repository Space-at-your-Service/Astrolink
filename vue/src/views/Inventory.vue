
<template>
	<div class="main-container">
		<h3 class="section-title">Inventory {{items}}</h3>	

		<b-container fluid class="p-0">
			<b-row no-gutters class="my-3">
				<b-col>
					<b-button v-b-modal.createModal size="lg" variant="info" class="float-left" style="border-radius: 15px;" v-if="isAllowed('inventory.add_item')">
						<b-icon icon="plus-circle-fill" class="mr-1"></b-icon>
						New item
					</b-button>
				</b-col>
				<b-col>
					<b-form-checkbox
						id="hideEmptyInput"
						v-model="hideEmpty"
						switch
						size="lg"
						class="mt-2"
						>
						Hide empty items
					</b-form-checkbox>
				</b-col>
				<b-col>
					<b-icon icon="search" class="h3 float-right mt-2 mr-2"></b-icon>
				</b-col>
				<b-col cols=3>
					<b-input-group class="mt-1">
						<b-form-input
						v-model="filter"
						type="search"
						id="filterInput"
						placeholder="Type to search . . ."
						></b-form-input>
					</b-input-group>
				</b-col>
			</b-row>
		</b-container>

		<b-pagination
			v-model="currentPage"
			:total-rows="items.length"
			:per-page="perPage"
			align="fill"
			size="sm"
			class="my-0"
		></b-pagination>

		<b-overlay :show="isBusy" variant="white" spinner-variant="primary" spinner-type="grow" rounded="sm">
			<b-table 
			id="inventory"
			ref="inventory"
			primary-key="id"
			:items="items" 
			:fields="fields"
			:filter="filter"
			:filter-included-fields="filterOn"
			:sort-by.sync="sortBy"
			:sort-desc.sync="sortDesc"
			:current-page="currentPage"
			:per-page="perPage"
			:busy="isBusy"
			fixed
			hover
			striped
			bordered
			head-variant="dark"
			table-variant="light"
			:tbody-tr-class="rowClass"
			:tbody-transition-props="transProps"

			@row-selected="onRowSelected"
			>

				<template #cell(quantity)="row">
					<div class="container">
						<div class="row">
							<div class="col">
								{{ row.item.quantity }}
							</div>
							<div class="col">
								<b-button-group class="float-right">
									<b-badge v-if="row.item.quantity == 0" variant="danger" class="m-auto">empty</b-badge>
									<b-button size="sm" @click="decrementItem(row.item)" class="mr-1" variant="" v-if="row.item.quantity > 0 && isAllowed('inventory.modify_item_qty')">
										<b-icon icon="dash"></b-icon>
									</b-button>
									<b-button size="sm" @click="incrementItem(row.item)" class="ml-1" variant="" v-if="isAllowed('inventory.modify_item_qty')">
										<b-icon icon="plus"></b-icon>
									</b-button>
								</b-button-group>
							</div>
						</div>
					</div>
				</template> 

				<template #cell(details)="row">
					<b-button size="sm" @click="row.toggleDetails" class="float-right" variant="">
					{{ row.detailsShowing ? 'Hide' : 'Show'}}
					</b-button>
				</template>

				<template #row-details="row">
					<div class="container p-0 ">
						<div class="row justify-content-between">
							<div class="col">
								<b class="text-info">{{ row.item.details }}</b>
							</div>
							<div class="col-1">
								<b-button-group class="float-right">
									<b-button v-b-modal.editModal size="sm" variant="info" @click="editModal(row.item)" class="mr-1" v-if="isAllowed('inventory.change_item')">
										<b-icon icon="pencil-square"></b-icon>
									</b-button>
									<b-button size="sm" variant="danger" @click="deleteItem(row.item)" class="ml-1" v-if="isAllowed('inventory.delete_item')">
										<b-icon icon="trash"></b-icon>
									</b-button>
								</b-button-group>
							</div>
						</div>
					</div>
				</template>

				<template #table-colgroup="scope">
					<col
					v-for="field in scope.fields"
					:key="field.key"
					:style="{ width: field.key !== 'name' ? '80px' : '180px' }"
					>
				</template>

				<template #table-busy>
					<div class="text-center text-info my-2">
						<b-spinner type="grow" class="align-middle"></b-spinner>
						<strong>Loading...</strong>
					</div>
				</template>
			</b-table>
		</b-overlay>


		<b-modal id="createModal" title="New item" centered @ok.prevent="okCreate" @hidden="resetCreatedItem">
			<form>

				<b-form-group
				label="Item ID"
				label-for="createdIdInput"
				:invalid-feedback="invalidIdFeedback()"
				:state="checkId(createdItem)"
				>
					<b-form-input id="createdIdInput" v-model="createdItem.id" :formatter="idFormatter"></b-form-input>
				</b-form-group>

				<b-form-group
				label="Name"
				label-for="createdNameInput"
				:invalid-feedback="invalidNameFeedback()"
				:state="checkName(createdItem)"
				>
					<b-form-input id="createdNameInput" v-model="createdItem.name" trim></b-form-input>
				</b-form-group>

				<b-form-group
				label="Quantity"
				label-for="createdQuantityInput"
				:invalid-feedback="invalidQuantityFeedback()"
				:state="checkQuantity(createdItem)"
				>
					<b-form-input id="createdQuantityInput" v-model="createdItem.quantity" type="number" min="0"></b-form-input>
				</b-form-group>

				<b-form-group
				label="Details"
				label-for="createdDetailsInput"
				:invalid-feedback="invalidDetailsFeedback()"
				:state="checkDetails(createdItem)"
				>
					<b-form-textarea id="createdDetailsInput" v-model="createdItem.details" size="sm" no-resize></b-form-textarea>
				</b-form-group>
			</form>
		</b-modal>

		<b-modal id="editModal" :title="editedItem.id" centered @ok.prevent="okEdit">
			<form>
				<b-form-group
				label="Name"
				label-for="editedNameInput"
				:invalid-feedback="invalidNameFeedback()"
				:state="checkName(editedItem)"
				>
					<b-form-input id="editedNameInput" v-model="editedItem.name" trim></b-form-input>
				</b-form-group>

				<b-form-group
				label="Quantity"
				label-for="editedQuantityInput"
				:invalid-feedback="invalidQuantityFeedback()"
				:state="checkQuantity(editedItem)"
				>
					<b-form-input id="editedQuantityInput" v-model="editedItem.quantity" type="number" min="0"></b-form-input>
				</b-form-group>

				<b-form-group
				label="Details"
				:invalid-feedback="invalidDetailsFeedback()"
				:state="checkDetails(editedItem)"
				>
					<b-form-textarea id="editedDetailsInput" v-model="editedItem.details" size="sm" no-resize></b-form-textarea>
				</b-form-group>
			</form>
		</b-modal>
	</div>
</template>

<script>
	import { mapState } from 'vuex'
	import { mapGetters } from 'vuex'
	import Notif from '../utils/Notif.js'

	export default {
		data() {
			return {
				fields: [
					{ key: 'id', label: 'Item ID', sortable: true, sortDirection: 'desc' },
					{ key: 'name', label: 'Name', sortable: true },
					{ key: 'quantity', label: 'Quantity', sortable: false },
					{ key: 'details', label: 'Details', sortable: false }
				],
				sortBy: 'id',
				sortDesc: false,
				sortDirection: 'asc',
				filter: null,
				filterOn: [],
				hideEmpty: false,
				transProps: {
					name: 'flip-list'
				},
				selected: [],
				currentPage: 1,
				perPage: 10,
				isBusy: false,
				createdItem: { id: '', name: '', details: '', quantity: 0 },
				editedItem: { id: '', name: '', details: '', quantity: 0 }
			}
		},
		computed: {
			...mapState('inventory', ['items']),
			...mapGetters('user', ['isAllowed']),
			sortOptions() {
				return this.fields
					.filter(f => f.sortable)
					.map(f => {
						return { text: f.label, value: f.key }
					})
			}
		},
		methods: {
			onRowSelected(item) {
				this.selected = item;
			},
			rowClass(item) {
				var res = ''
				if (item.quantity == 0) {
					res += 'table-danger'
					if (this.hideEmpty) res += ' d-none'
				}
				return res
			},
			incrementItem(item) {
				const editedItem = {...item}
				editedItem.quantity++;
				this.$store.dispatch('inventory/updateItem', editedItem)	
			},
			decrementItem(item) {
				if (item.quantity > 0) {
					const editedItem = {...item}
					editedItem.quantity--;
					this.$store.dispatch('inventory/updateItem', editedItem)
				}
			},
			editModal(item) {
				this.editedItem = {...item}
				
			},
			idFormatter(id) {
				return id.slice(0, 5).toUpperCase()
			},
			checkId(item) {
				return (item.id.length == 5)
			},
			checkName(item) {
				return (item.name.length >= 3 && item.name.length <= 20)
			},
			checkQuantity(item) {
				return (item.quantity >= 0 && item.quantity <= 32767)
			},
			checkDetails(item) {
				return (item.details.length <= 140)
			},
			checkItem(item) {
				if (item.details === '') {
					if (this.checkId(item) && this.checkName(item) &&this.checkQuantity(item)) {
						item.details = 'No details provided.'
						return true
					}
					else return false
				}
				else return (this.checkId(item) && this.checkName(item) &&this.checkQuantity(item) &&this.checkDetails(item))
			},
			invalidIdFeedback() {
				return 'Input the right ID format.'
			},
			invalidNameFeedback() {
				return 'Min. 3 characters, Max. 20 characters.'
			},
			invalidQuantityFeedback() {
				return 'Min. 0, Max. 32767.'
			},
			invalidDetailsFeedback() {
				return 'Max. 140 characters.'
			},
			resetCreatedItem() {
				this.createdItem.id = ''
				this.createdItem.name = ''
				this.createdItem.quantity = 0
				this.createdItem.details = ''
			},
			okCreate() {
				if (!this.checkItem(this.createdItem)) return
				else this.confirmCreate(this.createdItem)
			},
			okEdit() {
				if (!this.checkItem(this.editedItem)) return
				else this.confirmEdit(this.editedItem)
			},
			async confirmCreate(item) {
				this.$store.dispatch('inventory/createItem', item)
				.then(() => {
					this.$bvModal.hide('createModal')
					Notif.toastSuccess(this, 'Item created', 'The item has been successfully created.')
				})
				.catch(() => {
					Notif.toastError(this, 'Could not create', 'Could not create the item.')
				})	
			},
			async confirmEdit(item) {
				this.$store.dispatch('inventory/updateItem', item)
				.then(() => {
					this.$bvModal.hide('editModal')
					Notif.toastSuccess(this, 'Item updated', 'The item has been successfully updated.')
				})
				.catch(() => {
					Notif.toastError(this, 'Could not update', 'Could not update the item.')
				})		
			},
			async deleteItem(item) {
				this.$store.dispatch('inventory/deleteItem', item)
				.then(() => {
					Notif.toastSuccess(this, 'Item updated', 'The item has been successfully deleted.')
				})
				.catch(() => {
					Notif.toastError(this, 'Could not delete', 'Could not delete the item.')
				})	
			},
			async reloadInventory() {
				this.isBusy = true
				this.$store.dispatch('inventory/getInventoryState')
				.catch(() => {
					Notif.toastError(this, 'Loading error', 'An error has occured during loading.')
				})	
				.then(() => {
					this.refreshTable()
					this.isBusy = false
				})
			},
			refreshTable() {
				this.$refs.inventory.refresh()
			}
		}
	}

	
</script>

<style>
	table#inventory .flip-list-move {
		transition: transform 0.2s;
	}
</style>
