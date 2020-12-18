
<template>
	<div class="main-container">
		<h3 class="section-title">Inventory</h3>		
		<div class="container my-3 p-0">
			<div class="row no-gutters">
				<div class="col">
					<b-button v-b-modal.createModal size="md" variant="info" class="float-left" v-if="permissions.includes('inventory.add_item')">
						<b-icon icon="plus-square" class="mr-1"></b-icon>
						New item
					</b-button>
				</div>
				<div class="col">
					<b-form-checkbox
						id="hideEmptyInput"
						v-model="hideEmpty"
						switch
						size="lg"
						class="mt-1"
						>
						Hide empty items
					</b-form-checkbox>
				</div>
				<div class="col">
					<b-icon icon="search" class="h3 float-right mt-1 mr-2"></b-icon>
				</div>
				<div class="col-3">
					<b-input-group>
						<b-form-input
						v-model="filter"
						type="search"
						id="filterInput"
						placeholder="Type to search . . ."
						></b-form-input>
					</b-input-group>
				</div>
			</div>
		</div>

		<b-pagination
			v-model="currentPage"
			:total-rows="items.length"
			:per-page="perPage"
			align="fill"
			size="sm"
			class="my-0"
		></b-pagination>

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
								<b-button size="sm" @click="removeUnit(row.item)" class="mr-1" variant="" v-if="row.item.quantity > 0 && permissions.includes('inventory.modify_item_qty')">
									<b-icon icon="dash"></b-icon>
								</b-button>
								<b-button size="sm" @click="addUnit(row.item)" class="ml-1" variant="" v-if="permissions.includes('inventory.modify_item_qty')">
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
								<b-button v-b-modal.editModal size="sm" variant="info" @click="editModal(row.item)" class="mr-1" v-if="permissions.includes('inventory.change_item')">
									<b-icon icon="pencil-square"></b-icon>
								</b-button>
								<b-button size="sm" variant="danger" @click="deleteThisItem(row.item)" class="ml-1" v-if="permissions.includes('inventory.delete_item')">
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
	import {mapState} from 'vuex'
	import {mapActions} from 'vuex'
	import InventoryService from '../services/InventoryService'


	export default {
		data() {
			return {
				items: [],
				fields: [
					{ key: 'id', label: 'Item ID', sortable: true, sortDirection: 'desc' },
					{ key: 'name', label: 'Name', sortable: true },
					{ key: 'quantity', label: 'Quantity', sortable: false },
					{key: 'details', label: 'Details', sortable: false}
				],
				sortBy: '',
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
			...mapState(['inventoryHistory']),
			...mapState('perm', ['permissions']),
			sortOptions() {
				return this.fields
					.filter(f => f.sortable)
					.map(f => {
						return { text: f.label, value: f.key }
					})
			}
		},
		methods: {
			...mapActions(['addItemUnit', 'removeItemUnit', 'deleteItem', 'createNewItem']),
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
			addUnit(item) {
				item.quantity++;
				InventoryService.updateItem(item)
				.then(
					this.$bvToast.toast('Your item\'s quantity has been successfully edited.', {
							title: `Item quantity edited`,
							variant: 'success',
							solid: true
						})
				)
				.catch(e => {
					console.log(e),
					this.refreshInventory()
				})	

				// this.addItemUnit(id);
			},
			removeUnit(item) {
				if (item.quantity > 0) {
					item.quantity--;
					InventoryService.updateItem(item)
					.then(
						this.$bvToast.toast('Your item\'s quantity has been successfully edited.', {
							title: `Item quantity edited`,
							variant: 'success',
							solid: true
						})
					)
					.catch(e => {
						console.log(e),
						this.refreshInventory()
					})	

					// this.removeItemUnit(id);
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
				else this.confirmCreate()
			},
			okEdit() {
				if (!this.checkItem(this.editedItem)) return
				else this.confirmEdit()
			},
			confirmCreate() {
				console.log("^^^^^^^^^^^^^")
				console.log(this.createdItem)
				InventoryService.postItem(this.createdItem)
				.then(
					this.$nextTick(() => {
						this.$bvModal.hide('createModal')

						this.$bvToast.toast('Your item has been successfully created.', {
							title: `Item created`,
							variant: 'success',
							solid: true
						})

						this.refreshInventory()
					}),
				)
				.catch(e => {
					console.log(e)
				})	
			},
			confirmEdit() {
				InventoryService.updateItem(this.editedItem)
				.then(
					this.$nextTick(() => {
						this.$bvModal.hide('editModal')

						this.$bvToast.toast('Your item has been successfully edited.', {
							title: `Item edited`,
							variant: 'success',
							solid: true
						})

						this.refreshInventory()
					}),
				)
				.catch(e => {
					console.log(e)
				})	
			},
			deleteThisItem(item) {			
				InventoryService.deleteItem(item)
				.then(
					this.$nextTick(() => {
						this.$bvToast.toast('Your item has been successfully deleted.', {
							title: `Item deleted`,
							variant: 'success',
							solid: true
						})

						this.refreshInventory()
					})
				)
				.catch(e => {
					console.log(e)
				})	

				// this.deleteItem(item.id);
			},
			refreshInventory() {
	
				this.getItemsFromServer()
			},
			getItemsFromServer() {
				this.isBusy = true
				InventoryService.getItems()
				.then(response => {
					console.log('GET SUCCESS')
					this.items = response.data
				})
				.catch(e => {
					console.log(e)

					this.$bvToast.toast('An error has occured during load. Please retry.', {
						title: `Load error`,
						variant: 'danger',
						solid: true
					})
				})	
				.then(() => {
					this.$refs.inventory.refresh()
					this.isBusy = false
				})
			}
		},
		beforeMount() {
			this.getItemsFromServer()
		}
	}

	
</script>

<style>
	table#inventory .flip-list-move {
		transition: transform 0s;
	}
</style>
