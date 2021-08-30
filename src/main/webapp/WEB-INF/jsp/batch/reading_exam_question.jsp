<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!-- begin #content -->
<div id="content" class="content">
	<!-- begin page-header -->
	<h1 class="page-header">배치고사 Reading 시험문제 관리</h1>
	<hr />
	<!-- end page-header -->
	
	<div id="search_area" class="row mb-3">
		<label class="col-form-label col-1 text-right">자료종류</label>
		<div class="col-1">
			<input type="text" class="form-control m-b-5 text-center" id="type" name="type" value="${examInfo.type}" readonly/>
		</div>
		<label class="col-form-label col-1 text-right">회차</label>
		<div class="col-1">
			<input type="text" class="form-control m-b-5 text-center" id="num" name="num"  value="${examInfo.num}" readonly/>
		</div>
		<label class="col-form-label col-1 text-right">지문</label>
		<div class="col-1">
			<input type="text" class="form-control m-b-5 text-center" id="sub_num_text" name="sub_num_text"  value="Passage ${examInfo.sub_num}" readonly/>
			<input type="hidden" id="sub_num" name="sub_num"  value="${examInfo.sub_num}"/>
			<input type="hidden" id="flag" name="flag" />
		</div>
		<label class="col-form-label col-1 text-right">문제번호</label>
		<div class="col-1">
			<select class="form-control" id="question_num" name="question_num">
			</select>
		</div>		
		<div class="col-1">
			<button type="button" class="btn btn-primary" onclick="init_passage()"><i class="fa fa-reply fa-fw"></i> 지문 초기화</button>
		</div>			
		<div class="col-3 text-right">
			<button type="button" class="btn btn-primary" onclick="form_submit()"><i class="fa fa-save fa-fw"></i> 저장</button>
			<button type="button" class="btn btn-primary" onclick="move_exam()"><i class="fa fa-arrow-right fa-fw"></i> 지문 이동</button>
		</div>		
	</div>
	<div class="row">
		<div class="col-6">
			<div class="row">
				<div class="col-12">
					<div class="panel panel-inverse" data-sortable-id="table-basic-1">
						<div class="panel-heading">
							<h4 class="panel-title">문제 정보</h4>
							<div class="panel-heading-btn">
								<a href="javascript:;" class="btn btn-xs btn-icon btn-circle btn-warning" data-click="panel-collapse"><i class="fa fa-minus"></i></a>
							</div>
						</div>
						<div class="panel-body">
							<div class="form-group row m-b-15">
								<div class="col-md-12">
									<div class="table-responsive">
										<table class="table table-bordered m-b-0">
											<colgroup>
												<col style="width:15%;" />
												<col style="width:25%;" />
												<col style="width:15%;" />
												<col style="width:15%;" />
												<col style="width:15%;" />
												<col style="width:15%;" />
											</colgroup>											
											<tbody>
												<tr>
													<th>출제유형</th>
													<td class="with-form-control">
														<select class="form-control" id="question_type" name="question_type">
															<option value="VO">Vocabulary</option>
															<option value="FA">Fact &amp; Negative Fact</option>
															<option value="RE">Reference</option>
															<option value="SS">Sentence Simplification</option>
															<option value="IN">Insertion</option>
															<option value="RP">Rhetorical Purpose</option>
															<option value="IF">Inference</option>
															<option value="SU">Summary</option>
															<option value="CC">Category Chart</option>			
														</select>
													</td>
													<th>배점</th>
													<td class="with-form-control">
														<select class="form-control" id="score" name="score">
															<option value="0.6">0.6</option>
															<option value="0.7">0.7</option>
															<option value="0.75">0.75</option>
															<option value="1">1</option>
															<option value="1.25">1.25</option>
															<option value="2">2</option>
															<option value="3">3</option>
															<option value="4">4</option>
															<option value="5">5</option>			
														</select>
													</td>
													<th>문제유형</th>
													<td class="with-form-control">
														<select class="form-control" id="category" name="category">
															<option value="A">기본형</option>
															<option value="B">복수답</option>
															<option value="C">삽입형</option>
															<option value="D">Summary</option>
															<option value="E">Category</option>			
														</select>
													</td>
												</tr>
												<tr>
													<th>등록자/등록일시</th>
													<td colspan="2" id="created">
													</td>
													<th>수정자/수정일시</th>
													<td colspan="2" id="modified">
													</td>
												</tr>
											</tbody>
										</table>
									</div>
								</div>
							</div>					
						</div>
					</div>
				</div>
			</div>	
			<div class="row">
				<div class="col-12">
					<div class="panel panel-inverse" data-sortable-id="table-basic-3">
						<div class="panel-heading">
							<h4 class="panel-title">질문</h4>
							<div class="panel-heading-btn">
								<a href="javascript:;" class="btn btn-xs btn-icon btn-circle btn-warning" data-click="panel-collapse"><i class="fa fa-minus"></i></a>
							</div>
						</div>
						<div class="panel-body">
							<div class="form-group row m-b-15">
								<div class="col-md-12">
									<textarea class="ckeditor" id="question" name="question" rows="30"></textarea>
								</div>
							</div>					
						</div>
					</div>
				</div>
			</div>				
			<div class="row">
				<div class="col-12">
					<div class="panel panel-inverse" data-sortable-id="table-basic-2">
						<div class="panel-heading">
							<h4 class="panel-title">보기</h4>
							<div class="panel-heading-btn">
								<a href="javascript:;" class="btn btn-xs btn-icon btn-circle btn-warning" data-click="panel-collapse"><i class="fa fa-minus"></i></a>
							</div>
						</div>
						<div class="panel-body">
							<div class="form-group row m-b-15">
								<div class="col-md-12" id="div_question">
									<div class="table-responsive">
										<table class="table table-bordered m-b-0 table-td-valign-middle">
											<colgroup>
												<col style="width:10%;" />
												<col style="width:15%;" />
												<col style="width:25%;" />
												<col style="width:25%;" />
												<col style="width:25%;" />
											</colgroup>											
											<tbody>

												<tr>
													<td class="with-radio text-center">
														<div class="radio radio-css">
															<input type="radio" id="table_radio_2" name="table_radio">
															<label for="table_radio_2">&nbsp;</label>
														</div>
													</td>
													<td class="with-form-control" colspan="4">
														<input type="text" class="form-control" id="question_type" name="question_type">
													</td>
												</tr>
											</tbody>
										</table>
									</div>
								</div>
							</div>					
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="col-6">
			<div class="row">
				<div class="col-12">
					<div class="panel panel-inverse" data-sortable-id="table-basic-11">
						<div class="panel-heading">
							<h4 class="panel-title">제목</h4>
							<div class="panel-heading-btn">
								<a href="javascript:;" class="btn btn-xs btn-icon btn-circle btn-warning" data-click="panel-collapse"><i class="fa fa-minus"></i></a>
							</div>
						</div>
						<div class="panel-body">
							<div class="form-group row m-b-15">
								<div class="col-md-12">
									<div id="txt_passage"></div>
									<input type="hidden" id="passage" name="passage">
								</div>
							</div>					
						</div>
					</div>
				</div>
			</div>
			<div class="row">
				<div class="col-12">
					<div class="panel panel-inverse" data-sortable-id="table-basic-11">
						<div class="panel-heading">
							<h4 class="panel-title">문단 1</h4>
							<div class="panel-heading-btn">
								<a href="javascript:;" class="btn btn-xs btn-icon btn-circle btn-warning" data-click="panel-collapse"><i class="fa fa-minus"></i></a>
							</div>
						</div>
						<div class="panel-body">
							<div class="form-group row m-b-15">
								<div class="col-md-12">
									<textarea class="ckeditor" id="paragraph1" name="paragraph1" rows="30"></textarea>
								</div>
							</div>					
						</div>
					</div>
				</div>
			</div>
			<div class="row">
				<div class="col-12">
					<div class="panel panel-inverse" data-sortable-id="table-basic-16">
						<div class="panel-heading">
							<h4 class="panel-title">문단 2</h4>
							<div class="panel-heading-btn">
								<a href="javascript:;" class="btn btn-xs btn-icon btn-circle btn-warning" data-click="panel-collapse"><i class="fa fa-minus"></i></a>
							</div>
						</div>
						<div class="panel-body">
							<div class="form-group row m-b-15">
								<div class="col-md-12">
									<textarea class="ckeditor" id="paragraph2" name="paragraph2" rows="30"></textarea>
								</div>
							</div>					
						</div>
					</div>
				</div>
			</div>
			<div class="row">
				<div class="col-12">
					<div class="panel panel-inverse" data-sortable-id="table-basic-12">
						<div class="panel-heading">
							<h4 class="panel-title">문단 3</h4>
							<div class="panel-heading-btn">
								<a href="javascript:;" class="btn btn-xs btn-icon btn-circle btn-warning" data-click="panel-collapse"><i class="fa fa-minus"></i></a>
							</div>
						</div>
						<div class="panel-body">
							<div class="form-group row m-b-15">
								<div class="col-md-12">
									<textarea class="ckeditor" id="paragraph3" name="paragraph3" rows="30"></textarea>
								</div>
							</div>					
						</div>
					</div>
				</div>
			</div>
			<div class="row">
				<div class="col-12">
					<div class="panel panel-inverse" data-sortable-id="table-basic-17">
						<div class="panel-heading">
							<h4 class="panel-title">문단 4</h4>
							<div class="panel-heading-btn">
								<a href="javascript:;" class="btn btn-xs btn-icon btn-circle btn-warning" data-click="panel-collapse"><i class="fa fa-minus"></i></a>
							</div>
						</div>
						<div class="panel-body">
							<div class="form-group row m-b-15">
								<div class="col-md-12">
									<textarea class="ckeditor" id="paragraph4" name="paragraph4" rows="30"></textarea>
								</div>
							</div>					
						</div>
					</div>
				</div>
			</div>
			<div class="row">
				<div class="col-12">
					<div class="panel panel-inverse" data-sortable-id="table-basic-13">
						<div class="panel-heading">
							<h4 class="panel-title">문단 5</h4>
							<div class="panel-heading-btn">
								<a href="javascript:;" class="btn btn-xs btn-icon btn-circle btn-warning" data-click="panel-collapse"><i class="fa fa-minus"></i></a>
							</div>
						</div>
						<div class="panel-body">
							<div class="form-group row m-b-15">
								<div class="col-md-12">
									<textarea class="ckeditor" id="paragraph5" name="paragraph5" rows="30"></textarea>
								</div>
							</div>					
						</div>
					</div>
				</div>
			</div>
			<div class="row">
				<div class="col-12">
					<div class="panel panel-inverse" data-sortable-id="table-basic-18">
						<div class="panel-heading">
							<h4 class="panel-title">문단 6</h4>
							<div class="panel-heading-btn">
								<a href="javascript:;" class="btn btn-xs btn-icon btn-circle btn-warning" data-click="panel-collapse"><i class="fa fa-minus"></i></a>
							</div>
						</div>
						<div class="panel-body">
							<div class="form-group row m-b-15">
								<div class="col-md-12">
									<textarea class="ckeditor" id="paragraph6" name="paragraph6" rows="30"></textarea>
								</div>
							</div>					
						</div>
					</div>
				</div>
			</div>
			<div class="row">
				<div class="col-12">
					<div class="panel panel-inverse" data-sortable-id="table-basic-14">
						<div class="panel-heading">
							<h4 class="panel-title">문단 7</h4>
							<div class="panel-heading-btn">
								<a href="javascript:;" class="btn btn-xs btn-icon btn-circle btn-warning" data-click="panel-collapse"><i class="fa fa-minus"></i></a>
							</div>
						</div>
						<div class="panel-body">
							<div class="form-group row m-b-15">
								<div class="col-md-12">
									<textarea class="ckeditor" id="paragraph7" name="paragraph7" rows="30"></textarea>
								</div>
							</div>					
						</div>
					</div>
				</div>
			</div>
			<div class="row">
				<div class="col-12">
					<div class="panel panel-inverse" data-sortable-id="table-basic-19">
						<div class="panel-heading">
							<h4 class="panel-title">문단 8</h4>
							<div class="panel-heading-btn">
								<a href="javascript:;" class="btn btn-xs btn-icon btn-circle btn-warning" data-click="panel-collapse"><i class="fa fa-minus"></i></a>
							</div>
						</div>
						<div class="panel-body">
							<div class="form-group row m-b-15">
								<div class="col-md-12">
									<textarea class="ckeditor" id="paragraph8" name="paragraph8" rows="30"></textarea>
								</div>
							</div>					
						</div>
					</div>
				</div>
			</div>
			<div class="row">
				<div class="col-12">
					<div class="panel panel-inverse" data-sortable-id="table-basic-15">
						<div class="panel-heading">
							<h4 class="panel-title">문단 9</h4>
							<div class="panel-heading-btn">
								<a href="javascript:;" class="btn btn-xs btn-icon btn-circle btn-warning" data-click="panel-collapse"><i class="fa fa-minus"></i></a>
							</div>
						</div>
						<div class="panel-body">
							<div class="form-group row m-b-15">
								<div class="col-md-12">
									<textarea class="ckeditor" id="paragraph9" name="paragraph9" rows="30"></textarea>
								</div>
							</div>					
						</div>
					</div>
				</div>
			</div>
			<div class="row">
				<div class="col-12">
					<div class="panel panel-inverse" data-sortable-id="table-basic-10">
						<div class="panel-heading">
							<h4 class="panel-title">문단 10</h4>
							<div class="panel-heading-btn">
								<a href="javascript:;" class="btn btn-xs btn-icon btn-circle btn-warning" data-click="panel-collapse"><i class="fa fa-minus"></i></a>
							</div>
						</div>
						<div class="panel-body">
							<div class="form-group row m-b-15">
								<div class="col-md-12">
									<textarea class="ckeditor" id="paragraph10" name="paragraph10" rows="30"></textarea>
								</div>
							</div>					
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
<!-- end #content -->
<script src="/assets/plugins/ckeditor/ckeditor.js"></script>
<script type="text/javascript" src="/ui/batch/reading_exam_question.js"></script>
